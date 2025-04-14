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
} from "../../../src/types/extensionRegistration/ExtenstionRegistration";
import { Asset } from "../../../src/types/asset/Asset";

describe("ExtensionRegistrationService", () => {
  const mockAppExtensionId = "test-extension-id";

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
        mockAppExtensionId,
      );

      expect(mockGuestConnection.host.api.dialogs.open).toHaveBeenCalledWith(
        mockAppExtensionId,
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
        mockAppExtensionId,
      );

      expect(
        mockGuestConnection.host.api.dialogs_context.open,
      ).toHaveBeenCalledWith(mockAppExtensionId);
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

  describe("openSelectContentDialog", () => {
    it("should support opening the select content dialog", async () => {
      const mockGuestConnection = {
        host: {
          api: {
            contentSelectContentAddOns: {
              openDialog: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      };
      await ExtensionRegistrationService.openSelectContentDialog(
        mockGuestConnection,
        mockAppExtensionId,
      );

      expect(
        mockGuestConnection.host.api.contentSelectContentAddOns.openDialog,
      ).toHaveBeenCalledWith(mockAppExtensionId);
    });
  });

  describe("setSelectContentSelectedAssets", () => {
    const mockAssets: Asset[] = [
      {
        id: "asset1",
        name: "Asset 1",
        url: "https://example.com/asset1",
        thumbnailUrl: "https://example.com/asset1/thumbnail",
        location: "location1",
        source: "source1"
      },
      {
        id: "asset2",
        name: "Asset 2",
        url: "https://example.com/asset2",
        thumbnailUrl: "https://example.com/asset2/thumbnail",
        location: "location2",
        source: "source2"
      },
    ];

    it("should support setting the selected assets", async () => {
      const mockGuestConnection = {
        host: {
          api: {
            contentSelectContentDialog: {
              setSelectedAssets: jest.fn().mockResolvedValue(undefined),
            },
          },
        },
      };
      await ExtensionRegistrationService.setSelectContentSelectedAssets(
        mockGuestConnection,
        mockAssets,
        mockAppExtensionId,
      );
      expect(
        mockGuestConnection.host.api.contentSelectContentDialog.setSelectedAssets,
      ).toHaveBeenCalledWith(mockAssets, mockAppExtensionId);
    });
  });
});
