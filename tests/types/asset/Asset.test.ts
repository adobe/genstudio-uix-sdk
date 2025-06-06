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
  Asset,
  AssetMetadata,
  ExternalAsset,
} from "../../../src/types/asset/Asset";
import { Email, Meta } from "../../../src/types/channel/Channel";

describe("Asset", () => {
  it("should create an Asset with required properties", () => {
    const asset: Asset = {
      id: "asset-123",
      name: "Test Asset",
      signedUrl: "https://example.com/assets/test.jpg",
      sourceUrl: "https://example.com/assets/test.jpg",
      source: "bynder",
    };

    expect(asset.id).toBe("asset-123");
    expect(asset.name).toBe("Test Asset");
    expect(asset.signedUrl).toBe("https://example.com/assets/test.jpg");
    expect(asset.sourceUrl).toBe("https://example.com/assets/test.jpg");
    expect(asset.source).toBe("bynder");
    expect(asset.metadata).toBeUndefined();
  });

  it("should support optional metadata", () => {
    const metadata: AssetMetadata = {
      channels: [Email, Meta],
      timeframe: ["2023-Q1", "2023-Q2"],
      region: ["NA", "EMEA"],
      language: ["en-US", "fr-FR"],
      keywords: ["product", "marketing"],
    };

    const asset: Asset = {
      id: "asset-123",
      name: "Test Asset with Metadata",
      signedUrl: "https://example.com/assets/test.jpg",
      sourceUrl: "https://example.com/assets/test.jpg",
      source: "bynder",
      metadata,
    };

    expect(asset.metadata).toBeDefined();
    expect(asset.metadata?.channels).toContain(Email);
    expect(asset.metadata?.channels).toContain(Meta);
    expect(asset.metadata?.timeframe).toEqual(["2023-Q1", "2023-Q2"]);
    expect(asset.metadata?.region).toEqual(["NA", "EMEA"]);
    expect(asset.metadata?.language).toEqual(["en-US", "fr-FR"]);
    expect(asset.metadata?.keywords).toEqual(["product", "marketing"]);
  });
});

describe("AssetMetadata", () => {
  it("should create AssetMetadata with all properties", () => {
    const metadata: AssetMetadata = {
      channels: [Email, Meta],
      timeframe: ["2023-Q1", "2023-Q2"],
      region: ["NA", "EMEA"],
      language: ["en-US", "fr-FR"],
      keywords: ["product", "marketing"],
    };

    expect(metadata.channels).toHaveLength(2);
    expect(metadata.channels[0]).toBe(Email);
    expect(metadata.channels[1]).toBe(Meta);
    expect(metadata.timeframe).toEqual(["2023-Q1", "2023-Q2"]);
    expect(metadata.region).toEqual(["NA", "EMEA"]);
    expect(metadata.language).toEqual(["en-US", "fr-FR"]);
    expect(metadata.keywords).toEqual(["product", "marketing"]);
  });

  it("should allow empty arrays for metadata properties", () => {
    const metadata: AssetMetadata = {
      channels: [],
      timeframe: [],
      region: [],
      language: [],
      keywords: [],
    };

    expect(metadata.channels).toHaveLength(0);
    expect(metadata.timeframe).toHaveLength(0);
    expect(metadata.region).toHaveLength(0);
    expect(metadata.language).toHaveLength(0);
    expect(metadata.keywords).toHaveLength(0);
  });
});

describe("ExternalAsset", () => {
  it("should create an ExternalAsset with required properties", () => {
    const asset: ExternalAsset = {
      extensionId: "extension-123",
      assets: [
        {
          id: "asset-123",
          name: "Test Asset",
          signedUrl: "https://example.com/assets/test.jpg",
          sourceUrl: "https://example.com/assets/test.jpg",
          source: "bynder",
        },
      ],
    };

    expect(asset.extensionId).toBe("extension-123");
    expect(asset.assets[0].id).toBe("asset-123");
    expect(asset.assets[0].name).toBe("Test Asset");
    expect(asset.assets[0].signedUrl).toBe(
      "https://example.com/assets/test.jpg",
    );
    expect(asset.assets[0].sourceUrl).toBe(
      "https://example.com/assets/test.jpg",
    );
    expect(asset.assets[0].source).toBe("bynder");
  });
});
