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

import { GuestUI } from "@adobe/uix-guest";
import { CreateApi, GenerationContextService, GenerationContextError } from "../../../src/types/generationContext/GenerationContextService";
import { AdditionalContextTypes } from "../../../src/types/generationContext/GenerationContext";

const createMockConnection = (updateCustomPromptMock: jest.Mock) => ({
  host: {
    api: {
      create: {
        updateCustomPrompt: updateCustomPromptMock
      }
    }
  }
} as unknown as GuestUI<CreateApi>);

const mockExtension = { id: "test-extension-id" };

const mockContextType = AdditionalContextTypes.Claims;

const mockAdditionalContext = {
  extensionId: mockExtension.id,
  additionalContextType: AdditionalContextTypes.Claims,
  additionalContextValues: [
    { id: "123", description: "test-description" },
    { id: "456", description: "test-description-2" }
  ]
};

describe("GenerationContextService", () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("setAdditionalContext", () => {
    it("should set additional context", async () => {
      const updateCustomPromptMock = jest.fn().mockResolvedValue(undefined);
      const connection = createMockConnection(updateCustomPromptMock);
      await GenerationContextService.setAdditionalContext(connection, mockExtension, mockContextType, mockAdditionalContext);
      expect(updateCustomPromptMock).toHaveBeenCalledWith(mockExtension, mockContextType, mockAdditionalContext);
    });

    it("should throw GenerationContextError if connection is missing", async () => {
      const connection = null;
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        mockExtension,
        mockContextType,
        mockAdditionalContext
      )).rejects.toThrow(new GenerationContextError('Connection is required to set additional context'));
    });

    it("should throw GenerationContextError if extension ID is missing", async () => {
      const connection = createMockConnection(jest.fn());
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        null as unknown as { id: string },
        mockContextType,
        mockAdditionalContext
      )).rejects.toThrow(new GenerationContextError('Invalid extension ID'));
    });

    it("should throw GenerationContextError if context type is missing", async () => {
      const connection = createMockConnection(jest.fn());
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        mockExtension,
        null as unknown as AdditionalContextTypes,
        mockAdditionalContext
      )).rejects.toThrow(new GenerationContextError('Context type is required'));
    });

    it("should throw GenerationContextError if additional context values are missing", async () => {
      const connection = createMockConnection(jest.fn());
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        mockExtension,
        mockContextType,
        {
          ...mockAdditionalContext,
          additionalContextValues: []
        }
      )).rejects.toThrow(new GenerationContextError('Additional context values are required'));
    });
    

    it('should throw GenerationContextError on API failure', async () => {
      const updateCustomPromptMock = jest.fn().mockRejectedValue(new Error('API Error'));
      const connection = createMockConnection(updateCustomPromptMock);
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        mockExtension,
        mockContextType,
        mockAdditionalContext
      )).rejects.toThrow(new GenerationContextError('Failed to set additional context'));
    });
  });
});
