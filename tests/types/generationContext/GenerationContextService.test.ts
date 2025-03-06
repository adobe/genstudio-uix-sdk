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
import { AdditionalContext, AdditionalContextTypes, AdditionalContextValues, Claim } from "../../../src/types/generationContext/GenerationContext";

const createMockConnection = (updateAdditionalContextMock: jest.Mock, closeDialogMock: jest.Mock) => ({
  host: {
    api: {
      create: {
        updateAdditionalContext: updateAdditionalContextMock
      },
      dialogs_context: {
        close: closeDialogMock
      }
    }
  }
} as unknown as GuestUI<CreateApi>);

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

describe("GenerationContextService", () => {
  beforeEach(() => {
    jest.spyOn(console, 'error').mockImplementation(() => { });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("setAdditionalContext", () => {
    it("should set additional context", async () => {
      const updateAdditionalContextMock = jest.fn().mockResolvedValue(undefined);
      const connection = createMockConnection(updateAdditionalContextMock, jest.fn());
      await GenerationContextService.setAdditionalContext(connection, mockAdditionalContext);
      expect(updateAdditionalContextMock).toHaveBeenCalledWith(mockAdditionalContext);
    });

    it("should throw GenerationContextError if connection is missing", async () => {
      const connection = null;
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        mockAdditionalContext
      )).rejects.toThrow(new GenerationContextError('Connection is required to set additional context'));
    });

    it("should throw GenerationContextError if extension ID is missing", async () => {
      const connection = createMockConnection(jest.fn(), jest.fn());
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        { ...mockAdditionalContext, extensionId: null as unknown as string }
      )).rejects.toThrow(new GenerationContextError('Invalid extension ID'));
    });

    it("should throw GenerationContextError if context type is missing", async () => {
      const connection = createMockConnection(jest.fn(), jest.fn());
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        { ...mockAdditionalContext, additionalContextType: null as unknown as AdditionalContextTypes }
      )).rejects.toThrow(new GenerationContextError('Context type is required'));
    });

    it("should throw GenerationContextError if context type is invalid", async () => {
      const connection = createMockConnection(jest.fn(), jest.fn());
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        { ...mockAdditionalContext, additionalContextType: "invalid" as unknown as AdditionalContextTypes }
      )).rejects.toThrow(new GenerationContextError('Invalid context type'));
    });

    it("should not throw GenerationContextError if additional context values are missing", async () => {
      const closeDialogMock = jest.fn();
      const updateAdditionalContextMock = jest.fn().mockRejectedValue(new Error('API Error'));
      const connection = createMockConnection(updateAdditionalContextMock, closeDialogMock);
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        { ...mockAdditionalContext, additionalContextValues: [] }
      ));
      expect(closeDialogMock).toHaveBeenCalled();
      expect(updateAdditionalContextMock).not.toHaveBeenCalled();
    });

    it('should throw GenerationContextError on API failure', async () => {
      const updateAdditionalContextMock = jest.fn().mockRejectedValue(new Error('API Error'));
      const connection = createMockConnection(updateAdditionalContextMock, jest.fn());
      await expect(GenerationContextService.setAdditionalContext(
        connection as unknown as GuestUI<CreateApi>,
        mockAdditionalContext
      )).rejects.toThrow(new GenerationContextError('Failed to set additional context'));
    });
  });
});
