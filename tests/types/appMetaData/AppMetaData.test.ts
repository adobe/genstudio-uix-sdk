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

import { AppMetaData } from "../../../src/types/appMetaData/AppMetaData";
import { Email, Display, Meta } from "../../../src/types/channel/Channel";

describe("contract", () => {
  it("should define AppMetaData", () => {
    const appMetaData: AppMetaData = {
      id: "1234",
      label: "label",
      extensionId: "extensionId",
      iconDataUri: "iconDataUri",
      supportedChannels: [
        {
          id: "Email",
          name: "Email",
        },
      ],
    };
    expect(appMetaData).toBeDefined();
    expect(appMetaData.id).toBe("1234");
    expect(appMetaData.label).toBe("label");
    expect(appMetaData.iconDataUri).toBe("iconDataUri");
    expect(appMetaData.supportedChannels).toBeDefined();
    expect(appMetaData.supportedChannels.length).toBe(1);
    expect(appMetaData.supportedChannels[0].id).toBe("Email");
    expect(appMetaData.extensionId).toBe("extensionId");
  });

  it("should use Email, Display, and Meta as a channel", () => {
    const appMetaData: AppMetaData = {
      id: "1234",
      label: "label",
      extensionId: "extensionId",
      iconDataUri: "iconDataUri",
      supportedChannels: [Email, Meta, Display],
    };
    expect(appMetaData).toBeDefined();
    expect(appMetaData.id).toBe("1234");
    expect(appMetaData.label).toBe("label");
    expect(appMetaData.iconDataUri).toBe("iconDataUri");
    expect(appMetaData.supportedChannels).toBeDefined();
    expect(appMetaData.supportedChannels.length).toBe(3);
    expect(appMetaData.supportedChannels[0].id).toBe("email");
    expect(appMetaData.supportedChannels[0].name).toBe("Email");
    expect(appMetaData.supportedChannels[1].id).toBe("meta");
    expect(appMetaData.supportedChannels[1].name).toBe("Meta");
    expect(appMetaData.supportedChannels[2].id).toBe("display");
    expect(appMetaData.supportedChannels[2].name).toBe("Display");
    expect(appMetaData.extensionId).toBe("extensionId");
  });
});
