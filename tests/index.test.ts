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
  ExperienceService,
  ExperienceError,
  Experience,
  ExperienceField,
  Channel,
  AppMetaData,
  AppMetadata,
  GenerationContext,
  Email,
  Meta,
  Display,
  Brand,
  Persona,
  Product,
  Claim,
  AdditionalContextValues,
  AdditionalContextTypes,
  AdditionalContext,
  SectionGenerationContext,
} from "../src";

describe("SDK Exports", () => {
  it("should export ExperienceService", () => {
    expect(ExperienceService).toBeDefined();
    expect(typeof ExperienceService.getExperiences).toBe("function");
  });

  it("should export ExperienceError", () => {
    const error = new ExperienceError("test");
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("ExperienceError");
  });

  it("should export Experience types", () => {
    const field: ExperienceField = {
      fieldName: "test",
      fieldValue: "test",
    };

    const experience: Experience = {
      id: "test",
      experienceFields: { test: field },
    };

    expect(experience.id).toBe("test");
    expect(experience.experienceFields.test).toEqual(field);
  });

  it("should export Channel types", () => {
    const channel: Channel = {
      id: "test",
      name: "test",
    };

    expect(channel.id).toBe("test");
    expect(channel.name).toBe("test");

    const emailChannel: Channel = Email;
    expect(emailChannel.id).toBe("email");
    expect(emailChannel.name).toBe("Email");

    const metaChannel: Channel = Meta;
    expect(metaChannel.id).toBe("meta");
    expect(metaChannel.name).toBe("Meta");

    const displayChannel: Channel = Display;
    expect(displayChannel.id).toBe("display");
    expect(displayChannel.name).toBe("Display");
  });
  it("should export AppMetaData types", () => {
    const appMetaData: AppMetaData = {
      id: "test",
      label: "test",
      extensionId: "test",
      iconDataUri: "test",
      supportedChannels: [Email, Meta, Display],
    };

    expect(appMetaData.id).toBe("test");
    expect(appMetaData.label).toBe("test");
    expect(appMetaData.extensionId).toBe("test");
    expect(appMetaData.iconDataUri).toBe("test");
    expect(appMetaData.supportedChannels).toEqual([Email, Meta, Display]);
  });
  it("should export AppMetadata types", () => {
    const appMetadata: AppMetadata = {
      id: "test",
      label: "test",
      extensionId: "test",
      iconDataUri: "test",
      supportedChannels: [Email, Meta, Display],
    };

    expect(appMetadata.id).toBe("test");
    expect(appMetadata.label).toBe("test");
    expect(appMetadata.extensionId).toBe("test");
    expect(appMetadata.iconDataUri).toBe("test");
    expect(appMetadata.supportedChannels).toEqual([Email, Meta, Display]);
  });
  it("should export GenerationContext types", () => {
    const brand: Brand = {
      id: "test",
      name: "test",
    };
    expect(brand.id).toBe("test");

    const persona: Persona = {
      id: "test",
      name: "test",
    };
    expect(persona.id).toBe("test");

    const product: Product = {
      id: "test",
      name: "test",
    };
    expect(product.id).toBe("test");

    const claim: Claim = {
      id: "test",
      description: "test",
    };
    expect(claim.id).toBe("test");

    const additionalContextValues: AdditionalContextValues<Claim> = [
      {
        id: "test",
        description: "test",
      },
    ];
    expect(additionalContextValues.length).toBe(1);

    const additionalContext: AdditionalContext<Claim> = {
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues,
    };

    const sectionGenerationContext: SectionGenerationContext = {
      id: "test",
      additionalContexts: {
        [AdditionalContextTypes.Claims]: additionalContext,
      },
      product,
    };
    expect(sectionGenerationContext.id).toBe("test");

    const generationContext: GenerationContext = {
      id: "test",
      channel: Email,
      brand,
      product,
      persona,
      sections: [sectionGenerationContext],
    };

    expect(generationContext.id).toBe("test");
  });

  it("should export AppMetaData types", () => {
    const appMetaData: AppMetaData = {
      id: "test",
      label: "test",
      extensionId: "test",
      iconDataUri: "test",
      supportedChannels: [Email, Meta, Display],
    };

    expect(appMetaData.id).toBe("test");
    expect(appMetaData.label).toBe("test");
    expect(appMetaData.extensionId).toBe("test");
    expect(appMetaData.iconDataUri).toBe("test");
    expect(appMetaData.supportedChannels).toEqual([Email, Meta, Display]);
  });
});
