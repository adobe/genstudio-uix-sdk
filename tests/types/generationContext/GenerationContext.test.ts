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
  Brand,
  Persona,
  Product,
  Claim,
  AdditionalContextValues,
  AdditionalContextTypes,
  AdditionalContext,
  SectionGenerationContext,
  GenerationContext,
} from "../../../src/types/generationContext/GenerationContext";

const TEST_EXTENSION_ID = "test-extension-id";

describe("contract", () => {
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
    const additionalContextValues: AdditionalContextValues<Claim> = [
      {
        id: "12234",
        description: "my description",
      },
      {
        id: "12235",
        description: "my description 2",
      },
    ];
    expect(additionalContextValues).toBeDefined();
    expect(additionalContextValues[0].id).toBe("12234");
    expect(additionalContextValues[0].description).toBe("my description");
    expect(additionalContextValues[1].id).toBe("12235");
    expect(additionalContextValues[1].description).toBe("my description 2");
  });

  it("should define additionalContexts", () => {
    const additionalContextValues: AdditionalContextValues<Claim> = [
      {
        id: "12234",
        description: "my description",
      },
    ];
    const additionalContext: AdditionalContext<any> = {
      extensionId: TEST_EXTENSION_ID,
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
    const additionalContextValues: AdditionalContextValues<Claim> = [
      {
        id: "12234",
        description: "my description",
      },
    ];
    const additionalContext: AdditionalContext<any> = {
      extensionId: TEST_EXTENSION_ID,
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues: additionalContextValues,
    };
    const additionalContexts: Record<string, AdditionalContext<any>> = {
      type: additionalContext,
    };
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
    expect(sectionGenerationContext.additionalContexts).toEqual(
      additionalContexts,
    );
    expect(sectionGenerationContext.product).toEqual(product);
  });

  it("should define a single section generationContext", () => {
    const additionalContextValues: AdditionalContextValues<Claim> = [
      {
        id: "12234",
        description: "my description",
      },
    ];
    const additionalContext: AdditionalContext<any> = {
      extensionId: TEST_EXTENSION_ID,
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues: additionalContextValues,
    };
    const additionalContexts: Record<string, AdditionalContext<any>> = {
      type: additionalContext,
    };
    const product: Product = {
      id: "1234",
      name: "product",
    };
    const generationContext: GenerationContext = {
      id: "1234",
      userPrompt: "my user prompt",
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
    const additionalContextValues: AdditionalContextValues<Claim> = [
      {
        id: "12234",
        description: "my description",
      },
    ];
    const additionalContext = {
      extensionId: TEST_EXTENSION_ID,
      additionalContextType: AdditionalContextTypes.Claims,
      additionalContextValues: additionalContextValues,
    };
    const additionalContexts: Record<string, AdditionalContext<any>> = {
      type: additionalContext,
    };
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
      userPrompt: "my user prompt",
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

  it("should define a generationContext with empty values except id and userPrompt", () => {
    const generationContext: GenerationContext = {
      id: "1234",
      userPrompt: "my user prompt",
    };
    expect(generationContext).toBeDefined();
    expect(generationContext.id).toBe("1234");
    expect(generationContext.userPrompt).toBe("my user prompt");
    expect(generationContext.channel).toBeUndefined();
    expect(generationContext.brand).toBeUndefined();
    expect(generationContext.persona).toBeUndefined();
    expect(generationContext.sections).toBeUndefined();
  });
});
