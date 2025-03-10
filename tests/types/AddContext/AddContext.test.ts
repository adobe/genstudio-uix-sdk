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
import { AddContextService, AddContextError, AddContextApi } from '../../../src/types/AddContext/AddContext';
import { AdditionalContext, AdditionalContextTypes, AdditionalContextValues, Claim, GenerationContext } from '../../../src/types/generationContext/GenerationContext';

const createMockConnection = (updateAdditionalContextMock?: jest.Mock, getGenerationContextMock?: jest.Mock) => ({
  host: {
    api: {
      create: {
        updateAdditionalContext: updateAdditionalContextMock,
        getGenerationContext: getGenerationContextMock
      }
    }
  }
} as unknown as GuestUI<AddContextApi>);

const mockExtensionId: string = "test-extension-id";

const mockContextType: AdditionalContextTypes = AdditionalContextTypes.Claims;

const mockContextValues: AdditionalContextValues<Claim> = [
  { id: "123", description: "test-description" },
  { id: "456", description: "test-description-2" }
];

const mockAdditionalContext: AdditionalContext<Claim> = {
  extensionId: mockExtensionId,
  additionalContextType: mockContextType,
  additionalContextValues: mockContextValues
};

const mockGenerationContext: GenerationContext = {
  id: "123",
  userPrompt: "test-user-prompt"
};

describe('AddContextService', () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('setAdditionalContext', () => {
    it('should set additional context', async () => {
      const updateAdditionalContextMock = jest.fn().mockResolvedValue(undefined);
      const connection = createMockConnection(updateAdditionalContextMock);
      await AddContextService.setAdditionalContext(connection, mockAdditionalContext);
      expect(updateAdditionalContextMock).toHaveBeenCalledWith(mockAdditionalContext);
    });

    it('should throw AddContextError if connection is missing', async () => {
      const connection = null;
      await expect(AddContextService.setAdditionalContext(
        connection as unknown as GuestUI<AddContextApi>,
        mockAdditionalContext
      )).rejects.toThrow(new AddContextError('Connection is required to set additional context'));
    });

    it('should throw AddContextError if extension ID is missing', async () => {
      const connection = createMockConnection(jest.fn());
      await expect(AddContextService.setAdditionalContext(
        connection as unknown as GuestUI<AddContextApi>,
        { ...mockAdditionalContext, extensionId: null as unknown as string }
      )).rejects.toThrow(new AddContextError('Invalid extension ID'));
    });

    it('should throw AddContextError if context type is missing', async () => {
      const connection = createMockConnection(jest.fn());
      await expect(AddContextService.setAdditionalContext(
        connection as unknown as GuestUI<AddContextApi>,
        { ...mockAdditionalContext, additionalContextType: null as unknown as AdditionalContextTypes }
      )).rejects.toThrow(new AddContextError('Context type is required'));
    });

    it('should throw AddContextError if context type is invalid', async () => {
      const connection = createMockConnection(jest.fn());
      await expect(AddContextService.setAdditionalContext(
        connection as unknown as GuestUI<AddContextApi>,
        { ...mockAdditionalContext, additionalContextType: "invalid" as unknown as AdditionalContextTypes }
      )).rejects.toThrow(new AddContextError('Invalid context type'));
    });

    it('should throw AddContextError if additional context values are missing', async () => {
      const connection = createMockConnection(jest.fn());
      await expect(AddContextService.setAdditionalContext(
        connection as unknown as GuestUI<AddContextApi>,
        { ...mockAdditionalContext, additionalContextValues: [] }
      )).rejects.toThrow(new AddContextError('Additional context values are required'));
    });

    it('should throw AddContextError if context values have invalid format', async () => {
      const connection = createMockConnection(jest.fn());
      const invalidValues = [{ invalid: "format" }] as unknown as AdditionalContextValues<Claim>;
      await expect(AddContextService.setAdditionalContext(
        connection as unknown as GuestUI<AddContextApi>,
        { ...mockAdditionalContext, additionalContextValues: invalidValues }
      )).rejects.toThrow(new AddContextError('Invalid context value format'));
    });

    it('should throw AddContextError on API failure', async () => {
      const updateAdditionalContextMock = jest.fn().mockRejectedValue(new Error('API Error'));
      const connection = createMockConnection(updateAdditionalContextMock);
      await expect(AddContextService.setAdditionalContext(
        connection as unknown as GuestUI<AddContextApi>,
        mockAdditionalContext
      )).rejects.toThrow(new AddContextError('Failed to set additional context'));
    });
  });

  describe('getGenerationContext', () => {
    it('should get generation context', async () => {
      const getGenerationContextMock = jest.fn().mockResolvedValue(mockGenerationContext);
      const connection = createMockConnection(undefined, getGenerationContextMock);
      const generationContext = await AddContextService.getGenerationContext(connection);
      expect(generationContext).toEqual(mockGenerationContext);
    });

    it('should throw AddContextError if connection is missing', async () => {
      const connection = null;
      await expect(AddContextService.getGenerationContext(
        connection as unknown as GuestUI<AddContextApi>
      )).rejects.toThrow(new AddContextError('Connection is required to get generation context'));
    });

    it('should throw AddContextError on API failure', async () => {
      const getGenerationContextMock = jest.fn().mockRejectedValue(new Error('API Error'));
      const connection = createMockConnection(undefined, getGenerationContextMock);
      await expect(AddContextService.getGenerationContext(connection))
        .rejects
        .toThrow(new AddContextError('Failed to get generation context'));
    });
  });
}); 