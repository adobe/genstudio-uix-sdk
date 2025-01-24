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
  FieldRole,
  ExperienceField,
  Experience,
  Channel,
  Brand,
  Persona,
  Product,
  Claim,
  AdditionalContextValues,
  AdditionalContextTypes,
  AdditionalContext,
  SectionGenerationContext,
  GenerationContext,
  AppMetaData,
  Email,
  Meta,
  Display,
} from "../src/index";

describe("contract", () => {
  it("should define FieldRole", () => {
    const fieldRole: FieldRole = {
      name: "subject",
    };
    expect(fieldRole).toBeDefined();
    expect(fieldRole.name).toBe("subject");
  });

  it("should define ExperienceField with fieldValue as a string", () => {
    const experienceField: ExperienceField = {
      fieldRole: {
        name: "subject",
      },
      fieldName: "subject",
      fieldValue: "test field value",
      readonly: true,
    };
    expect(experienceField).toBeDefined();
    expect(experienceField.fieldRole.name).toBe("subject");
    expect(experienceField.fieldName).toBe("subject");
    expect(experienceField.fieldValue).toBe("test field value");
  });

  it("should define ExperienceField with fieldValue as an object", () => {
    const experienceField: ExperienceField = {
      fieldRole: {
        name: "subject",
      },
      fieldName: "subject",
      fieldValue: {
        key: "value",
      },
      readonly: true,
    };
    expect(experienceField).toBeDefined();
    expect(experienceField.fieldRole.name).toBe("subject");
    expect(experienceField.fieldName).toBe("subject");
    expect(experienceField.fieldValue).toEqual({ key: "value" });
  });

  it("should define Experience", () => {
    const experienceFields = new Map<string, ExperienceField>([
      [
        "subject",
        {
          fieldRole: {
            name: "subject",
          },
          fieldName: "subject",
          fieldValue: "test field value",
          readonly: false,
        },
      ],
      [
        "section2_image",
        {
          fieldRole: {
            name: "image",
          },
          fieldName: "section2_image",
          fieldValue: {
            test: "1",
          },
          readonly: true,
        },
      ],
    ]);
    const experience: Experience = {
      id: "230853274642",
      experienceFields: experienceFields,
    };
    expect(experience).toBeDefined();
    expect(experience.id).toBe("230853274642");
    expect(experience.experienceFields).toBeInstanceOf(Map);
    expect(experience.experienceFields.size).toBe(2);
    expect(experience.experienceFields.get("subject")).toBeDefined();
    expect(experience.experienceFields.get("subject")?.fieldRole.name).toBe(
      "subject"
    );
    expect(experience.experienceFields.get("subject")?.fieldName).toBe(
      "subject"
    );
    expect(experience.experienceFields.get("subject")?.fieldValue).toBe(
      "test field value"
    );
    expect(experience.experienceFields.get("section2_image")).toBeDefined();
    expect(
      experience.experienceFields.get("section2_image")?.fieldRole.name
    ).toBe("image");
    expect(experience.experienceFields.get("section2_image")?.fieldName).toBe(
      "section2_image"
    );
    expect(
      experience.experienceFields.get("section2_image")?.fieldValue
    ).toEqual({
      test: "1",
    });
  });

  it("should define Channel", () => {
    const channel: Channel = {
      id: "Email",
      name: "Email",
    };
    expect(channel).toBeDefined();
    expect(channel.id).toBe("Email");
    expect(channel.name).toBe("Email");
  });

  it("should define Brand", () => {
    const brand: Brand = {
      id: "1243",
      name: "brand",
    };
    expect(brand).toBeDefined();
    expect(brand.id).toBe("1243");
    expect(brand.name).toBe("brand");
  });

  it("should define Persona", () => {
    const persona: Persona = {
      id: "1234",
      name: "persona",
    };
    expect(persona).toBeDefined();
    expect(persona.id).toBe("1234");
    expect(persona.name).toBe("persona");
  });

  it("should define Product", () => {
    const product: Product = {
      id: "1234",
      name: "product",
    };
    expect(product).toBeDefined();
    expect(product.id).toBe("1234");
    expect(product.name).toBe("product");
  });

  it("should define Claim", () => {
    const claim: Claim = {
      id: "12234",
      description: "my description",
    };
    expect(claim).toBeDefined();
    expect(claim.id).toBe("12234");
    expect(claim.description).toBe("my description");
  });

  it("should define additionalContextValues", () => {
    const additionalContextValues: AdditionalContextValues<Claim> = {
      additionalContextValues: [{
        id: "12234",
        description: "my description",
      }, {
        id: "12235",
        description: "my description 2",
      }],
    };
    expect(additionalContextValues).toBeDefined();
    expect(additionalContextValues.additionalContextValues[0].id).toBe("12234");
    expect(additionalContextValues.additionalContextValues[0].description).toBe(
      "my description"
    );
    expect(additionalContextValues.additionalContextValues[1].id).toBe("12235");
    expect(additionalContextValues.additionalContextValues[1].description).toBe(
      "my description 2"
    );
  });
  it("should define additionalContexts", () => {
    const additionalContextValues: AdditionalContextValues<Claim> = {
      additionalContextValues: [{
        id: "12234",
        description: "my description",
      }],
    };
    const additionalContext: AdditionalContext<any> = {
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues: additionalContextValues,
    };
    const additionalContexts = new Map<string, AdditionalContext<any>>([
      ["type", additionalContext],
    ]);
    expect(additionalContexts).toBeDefined();
    expect(additionalContexts.size).toBe(1);
    expect(additionalContexts.get("type")).toBeDefined();
    expect(additionalContexts.get("type")).toEqual(additionalContext);
  });

  it("should define SectionGenerationContext", () => {
    const additionalContextValues: AdditionalContextValues<Claim> = {
      additionalContextValues: [{
        id: "12234",
        description: "my description",
      }],
    };
    const additionalContext: AdditionalContext<any> = {
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues: additionalContextValues,
    };
    const additionalContexts = new Map<string, AdditionalContext<any>>([
      ["type", additionalContext],
    ]);
    const product: Product = {
      id: "1234",
      name: "product",
    };
    const sectionGenerationContext: SectionGenerationContext = {
      id: "1234",
      additionalContexts: additionalContexts,
      product: product,
    };
    expect(sectionGenerationContext).toBeDefined();
    expect(sectionGenerationContext.id).toBe("1234");
    expect(sectionGenerationContext.additionalContexts).toEqual(additionalContexts);
    expect(sectionGenerationContext.product).toEqual(product);
  });

  it("should define a single section generationContext", () => {
    const additionalContextValues: AdditionalContextValues<Claim> = {
      additionalContextValues: [{
        id: "12234",
        description: "my description",
      }],
    };
    const additionalContext: AdditionalContext<any> = {
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues: additionalContextValues,
    };
    const additionalContexts = new Map<string, AdditionalContext<any>>([
      ["type", additionalContext],
    ]);
    const product: Product = {
      id: "1234",
      name: "product",
    };
    const generationContext: GenerationContext = {
      id: "1234",
      channel: {
        id: "Email",
        name: "Email",
      },
      brand: {
        id: "1243",
        name: "brand",
      },
      persona: {
        id: "1234",
        name: "persona",
      },
      product: product,
      additionalContexts: additionalContexts,
    };
    expect(generationContext).toBeDefined();
    expect(generationContext.channel).toBeDefined();
    expect(generationContext.brand).toBeDefined();
    expect(generationContext.persona).toBeDefined();
    expect(generationContext.product).toBeDefined();
    expect(generationContext.additionalContexts).toBeDefined();
    expect(generationContext.additionalContexts).toEqual(additionalContexts);
  });

  it("should define a multi-section generationContext", () => {
    const additionalContextValues: AdditionalContextValues<Claim> = {
      additionalContextValues: [{
        id: "12234",
        description: "my description",
      }],
    };
    const additionalContext = {
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues: additionalContextValues,
    };
    const additionalContexts = new Map<string, AdditionalContext<any>>([
      ["type", additionalContext],
    ]);
    const product: Product = {
      id: "1234",
      name: "product",
    };
    const sectionGenerationContext: SectionGenerationContext = {
      id: "1234",
      additionalContexts: additionalContexts,
      product: product,
    };
    const generationContext: GenerationContext = {
      id: "1234",
      channel: {
        id: "Email",
        name: "Email",
      },
      brand: {
        id: "1243",
        name: "brand",
      },
      persona: {
        id: "1234",
        name: "persona",
      },
      sections: [sectionGenerationContext],
    };
    expect(generationContext).toBeDefined();
    expect(generationContext.channel).toBeDefined();
    expect(generationContext.brand).toBeDefined();
    expect(generationContext.persona).toBeDefined();
    expect(generationContext.sections).toBeDefined();
    expect(generationContext.sections?.length).toBe(1);
    expect(generationContext.sections?.[0]).toEqual(sectionGenerationContext);
  });

  it("should define AppMetaData", () => {
    const appMetaData: AppMetaData = {
        id: "1234",
        label: "label",
        extensionId: "extensionId",
        iconDataUri: "iconDataUri",
        supportedChannels: [
            {
                id: "Email",
                name: "Email"
            }
        ]
    }
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
      supportedChannels: [
          Email,
          Meta,
          Display
      ]
  }
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
