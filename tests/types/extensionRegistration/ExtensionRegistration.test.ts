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

import {
  ExtensionRegistrationService,
  ExtensionRegistrationError,
} from "../../../src/types/extensionRegistration/ExtensionRegistration";
import { Asset } from "../../../src/types/asset/Asset";

describe("ExtensionRegistrationService", () => {
  const mockExtensionId = "test-extension-id";

  describe("openCreateAddOnBar", () => {
    it("should support opening the add on bar", async () => {
      const mockGuestConnection = {
        host: {
          api: {
            dialogs: {
              open: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      };

      await ExtensionRegistrationService.openCreateAddOnBar(
        mockGuestConnection,
        mockExtensionId,
      );

      expect(mockGuestConnection.host.api.dialogs.open).toHaveBeenCalledWith(
        mockExtensionId,
      );
    });
  });

  describe("openAddContextAddOnBar", () => {
    it("should support opening the add context add on bar", async () => {
      const mockGuestConnection = {
        host: {
          api: {
            dialogs_context: {
              open: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      };
      await ExtensionRegistrationService.openAddContextAddOnBar(
        mockGuestConnection,
        mockExtensionId,
      );

      expect(
        mockGuestConnection.host.api.dialogs_context.open,
      ).toHaveBeenCalledWith(mockExtensionId);
    });
  });

  describe("closeAddContextAddOnBar", () => {
    it("should support closing the add context add on bar", async () => {
      const mockGuestConnection = {
        host: {
          api: {
            dialogs_context: {
              close: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      };
      await ExtensionRegistrationService.closeAddContextAddOnBar(
        mockGuestConnection,
      );

      expect(
        mockGuestConnection.host.api.dialogs_context.close,
      ).toHaveBeenCalled();
    });
  });

  describe("Select Content Extension", () => {
    const mockAssets: Asset[] = [
      {
        id: "asset1",
        name: "Asset 1",
        signedUrl: "https://example.com/asset1",
        sourceUrl: "https://example.com/asset1",
        source: "source1"
      },
      {
        id: "asset2",
        name: "Asset 2",
        signedUrl: "https://example.com/asset2",
        sourceUrl: "https://example.com/asset2",
        source: "source2"
      },
    ];

    it("should support setting the selected assets", async () => {
      const mockGuestConnection = {
        host: {
          api: {
            selectContentExtension: {
              setSelectedAssets: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      };
      await ExtensionRegistrationService.selectContentExtensionSetSelectedAssets(
        mockGuestConnection,
        mockExtensionId,
        mockAssets,
      );
      expect(
        mockGuestConnection.host.api.selectContentExtension.setSelectedAssets,
      ).toHaveBeenCalledWith(mockExtensionId, mockAssets);
    });

    it("should support syncing the selected assets", async () => {
      const mockGuestConnection = {
        host: {
          api: {
            selectContentExtension: {
              sync: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      };
      await ExtensionRegistrationService.selectContentExtensionSync(
        mockGuestConnection,
      );
      expect(
        mockGuestConnection.host.api.selectContentExtension.sync,
      ).toHaveBeenCalled();
    });
  });
});
