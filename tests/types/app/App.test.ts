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

import { App, Toggle } from "../../../src/types/app/App";
import { AppMetadata } from "../../../src/types/app/AppMetadata";
import { Email, Meta, Display } from "../../../src/types/channel/Channel";

describe("App", () => {
  const mockMetadata: AppMetadata = {
    id: "test-app-id",
    label: "Test App",
    extensionId: "test-extension-id",
    iconDataUri: "data:image/png;base64,test123",
    supportedChannels: [Email, Meta, Display],
  };

  it("should create an App with required properties", () => {
    const app: App = {
      metadata: mockMetadata,
      url: "https://example.com/app",
    };

    expect(app.metadata).toBe(mockMetadata);
    expect(app.url).toBe("https://example.com/app");
  });

  it("should validate App metadata properties", () => {
    const app: App = {
      metadata: mockMetadata,
      url: "https://example.com/app",
    };

    expect(app.metadata.id).toBe("test-app-id");
    expect(app.metadata.label).toBe("Test App");
    expect(app.metadata.extensionId).toBe("test-extension-id");
    expect(app.metadata.iconDataUri).toBe("data:image/png;base64,test123");
    expect(app.metadata.supportedChannels).toEqual([Email, Meta, Display]);
  });
});

describe("Toggle", () => {
  const mockMetadata: AppMetadata = {
    id: "test-toggle-id",
    label: "Test Toggle",
    extensionId: "test-extension-id",
    iconDataUri: "data:image/png;base64,test123",
    supportedChannels: [Email],
  };

  it("should create a Toggle with required properties", () => {
    const onClickMock = jest.fn();
    const toggle: Toggle = {
      metadata: mockMetadata,
      onClick: onClickMock,
    };

    expect(toggle.metadata).toBe(mockMetadata);
    expect(toggle.onClick).toBe(onClickMock);
  });

  it("should execute onClick callback", () => {
    const onClickMock = jest.fn();
    const toggle: Toggle = {
      metadata: mockMetadata,
      onClick: onClickMock,
    };

    toggle.onClick();
    expect(onClickMock).toHaveBeenCalledTimes(1);
  });

  it("should validate Toggle metadata properties", () => {
    const toggle: Toggle = {
      metadata: mockMetadata,
      onClick: jest.fn(),
    };

    expect(toggle.metadata.id).toBe("test-toggle-id");
    expect(toggle.metadata.label).toBe("Test Toggle");
    expect(toggle.metadata.extensionId).toBe("test-extension-id");
    expect(toggle.metadata.iconDataUri).toBe("data:image/png;base64,test123");
    expect(toggle.metadata.supportedChannels).toEqual([Email]);
  });
});
