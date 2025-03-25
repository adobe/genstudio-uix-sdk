/*
Copyright 2025 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.
*/

import { GuestUI } from '@adobe/uix-guest';
import { RightPanelService, RightPanelError, RightPanelApi } from '../../../src/types/RightPanel/RightPanel';
import { GenerationContext } from '../../../src/types/generationContext/GenerationContext';

const createMockConnection = (getExperiencesMock?: jest.Mock, getGenerationContextMock?: jest.Mock) => ({
  host: {
    api: {
      createRightPanel: {
        getExperiences: getExperiencesMock,
        getGenerationContext: getGenerationContextMock
      }
    }
  }
} as unknown as GuestUI<RightPanelApi>);

describe('RightPanelService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  const mockRawExperience = {
    id: 'exp123',
    fields: {
      name: 'Test Experience',
      description: 'Test Description',
      complexField: { key: 'value' }
    }
  };

  const mockGenerationContext: GenerationContext = {
    id: "123",
    userPrompt: "test-user-prompt"
  };

  describe('convertRawExperienceToExperience', () => {
    it('should convert raw experience to Experience format', () => {
      const result = RightPanelService.convertRawExperienceToExperience(mockRawExperience);

      expect(result.id).toBe('exp123');
      expect(result.experienceFields.name).toEqual({
        fieldName: 'name',
        fieldValue: 'Test Experience'
      });
      expect(result.experienceFields.complexField).toEqual({
        fieldName: 'complexField',
        fieldValue: '{"key":"value"}'
      });
    });

    it('should handle missing id', () => {
      const result = RightPanelService.convertRawExperienceToExperience({
        fields: mockRawExperience.fields
      });
      expect(result.id).toBe('');
    });

    it('should handle null field values', () => {
      const result = RightPanelService.convertRawExperienceToExperience({
        id: 'exp123',
        fields: { nullField: null }
      });
      expect(result.experienceFields.nullField.fieldValue).toBe('');
    });

    it('should handle undefined field values', () => {
      const result = RightPanelService.convertRawExperienceToExperience({
        id: 'exp123',
        fields: { undefinedField: undefined }
      });
      expect(result.experienceFields.undefinedField.fieldValue).toBe('');
    });

    it('should handle falsy field values', () => {
      const result = RightPanelService.convertRawExperienceToExperience({
        id: 'exp123',
        fields: { 
          nullField: null,
          undefinedField: undefined,
          emptyString: '',
          zeroNumber: 0,
          falseBoolean: false
        }
      });
      
      expect(result.experienceFields.nullField.fieldValue).toBe('');
      expect(result.experienceFields.undefinedField.fieldValue).toBe('');
      expect(result.experienceFields.emptyString.fieldValue).toBe('');
      expect(result.experienceFields.zeroNumber.fieldValue).toBe('0');
      expect(result.experienceFields.falseBoolean.fieldValue).toBe('false');
    });
  });

  describe('convertRawExperiencesToExperiences', () => {
    it('should convert array of raw experiences', () => {
      const rawExperiences = [mockRawExperience, mockRawExperience];
      const results = RightPanelService.convertRawExperiencesToExperiences(rawExperiences);
      
      expect(results).toHaveLength(2);
      expect(results[0].id).toBe('exp123');
      expect(results[1].id).toBe('exp123');
    });

    it('should handle empty array', () => {
      const results = RightPanelService.convertRawExperiencesToExperiences([]);
      expect(results).toHaveLength(0);
    });
  });

  describe('getExperiences', () => {
    it('should fetch and convert experiences', async () => {
      const mockGetExperiences = jest.fn().mockResolvedValue([mockRawExperience]);
      const mockConnection = createMockConnection(mockGetExperiences);

      const results = await RightPanelService.getExperiences(mockConnection);
      
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('exp123');
      expect(mockGetExperiences).toHaveBeenCalled();
    });

    it('should throw RightPanelError on API failure', async () => {
      const mockGetExperiences = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(mockGetExperiences);

      await expect(RightPanelService.getExperiences(mockConnection))
        .rejects
        .toThrow(RightPanelError);
      await expect(RightPanelService.getExperiences(mockConnection))
        .rejects
        .toThrow('Failed to fetch experiences from host');
    });

    it('should throw RightPanelError if connection is missing', async () => {
      // @ts-ignore Testing null case explicitly
      await expect(RightPanelService.getExperiences(null))
        .rejects
        .toThrow(RightPanelError);
      // @ts-ignore Testing null case explicitly  
      await expect(RightPanelService.getExperiences(null))
        .rejects
        .toThrow('Connection is required to get experiences');
    });

    it('should handle already converted experiences', async () => {
      const mockGetExperiences = jest.fn().mockResolvedValue([{
        id: 'exp123',
        experienceFields: {
          name: {
            fieldName: 'name',
            fieldValue: 'Test Experience'
          }
        }
      }]);
      const mockConnection = createMockConnection(mockGetExperiences);

      const results = await RightPanelService.getExperiences(mockConnection);
      
      expect(results).toHaveLength(1);
      expect(results[0].id).toBe('exp123');
      expect(results[0].experienceFields.name).toEqual({
        fieldName: 'name',
        fieldValue: 'Test Experience'
      });
    });
  });

  describe('getGenerationContext', () => {
    it('should get generation context', async () => {
      const mockGetGenerationContext = jest.fn().mockResolvedValue(mockGenerationContext);
      const mockConnection = createMockConnection(undefined, mockGetGenerationContext);
      const generationContext = await RightPanelService.getGenerationContext(mockConnection);
      expect(generationContext).toEqual(mockGenerationContext);
    });

    it('should throw RightPanelError if connection is missing', async () => {
      const connection = null;
      await expect(RightPanelService.getGenerationContext(
        connection as unknown as GuestUI<RightPanelApi>
      )).rejects.toThrow(new RightPanelError('Connection is required to get generation context'));
    });

    it('should throw RightPanelError on API failure', async () => {
      const mockGetGenerationContext = jest.fn().mockRejectedValue(new Error('API Error'));
      const mockConnection = createMockConnection(undefined, mockGetGenerationContext);
      await expect(RightPanelService.getGenerationContext(mockConnection))
        .rejects
        .toThrow(new RightPanelError('Failed to get generation context'));
    });
  });
});
