# API Documentation

### **Experience**

The `Experience` object represents an `Experience` in GenStudio.

- **FieldRole**: Defines the role of a field in an experience.

  ```typescript
  type FieldRole = {
    name: string; // The name of the field role.
  };
  ```

- **ExperienceField**: Represents an individual field within an experience. For example, this can be a "header" or an "image".

  ```typescript
  type ExperienceField = {
    fieldRole: FieldRole; // Role of the field.
    fieldName: string; // Name of the field.
    fieldValue: string | Object; // Value of the field.
    readonly: boolean; // Whether the field is read-only.
  };
  ```

- **Experience**: Represents the overall structure of an experience.
  ```typescript
  type Experience = {
    id: string; // Unique identifier for the experience.
    experienceFields: Map<string, ExperienceField>; // Map of fields in the experience.
  };
  ```

**Example:**

```json
{
  "id": "230853274642",
  "experienceFields": {
    "section1_headline": {
      "fieldRole": {
        "name": "headline"
      },
      "fieldName": "section2_headline",
      "fieldValue": "Train Like a Pro with LFC Academy",
      "readOnly": false
    },
    "section2_image": {
      "fieldRole": {
        "name": "image"
      },
      "fieldName": "section2_image",
      "fieldValue": {
        "alt": "LFC Academy",
        "src": "https://images.genstudio.com/my-photo",
        "width": 600,
        "height": 400,
        "reference": "02353947548726"
      },
      "readOnly": true
    }
  }
}
```

---

### **Generation Context**

The `GenerationContext` provides details about the environment for generating an experience with GenStudio Create.

- **Channel**: Represents the type of channel to generate the content for in GenStudio. For example: Email or Display

  ```typescript
  type Channel = {
    id: string; // Unique identifier for the channel.
    name: string; // Name of the channel.
  };
  ```

- **Brand, Persona, Product**: All represent corresponding fields in GenStudio Create context.

  ```typescript
  type Brand = { id: string; name: string };
  type Persona = { id: string; name: string };
  type Product = { id: string; name: string };
  ```

- **Claim**: A claim to support the user generated prompt.

  ```typescript
  type Claim = {
    id: string; // Unique identifier for the claim.
    description: string; // Description of the claim.
  };
  ```

- **AdditionalContext**: Custom prompt used for generating content.

  ```typescript
  type AdditionalContext = {
    additionalContextType: string; // Type of the prompt.
    additionalContextValues: [ Claim ]; // Associated value.
  };
  ```

- **SectionGenerationContext**: Represents a specific section's generation context.

  ```typescript
  type SectionGenerationContext = {
    id: string; // Section ID.
    additionalContexts: Map<string, AdditionalContext<any>>; // Prompts specific to the section.
    product: string; // Product associated with the section.
  };
  ```

- **GenerationContext**: Represents the overall context.
  ```typescript
  type GenerationContext = {
    id: string; // Unique identifier.
    channel: Channel; // Associated channel.
    brand: Brand; // Associated brand.
    product: Product; // Associated product.
    persona: Persona; // Associated persona.
    additionalContexts: Map<string, AdditionalContext>; // Prompts for the context.
    sections: SectionGenerationContext[]; // Sections within the context.
  };
  ```

**Example:**
Single section

```json
{
  "id": "46754879",
  "channel": { "id": "Email", "name": "Email" },
  "brand": { "id": "brand-1", "name": "My Modern Brand" },
  "product": { "id": "prod-1", "name": "My Toothpaste" },
  "persona": { "id": "persona-1", "name": "Marketer" },
  "additionalContexts": {
    "claims": {
      "additionalContextType": "claims",
      "additionalContextValues": [
        {
          "id": "claim-1",
          "description": "Toothpaste can kill 98% of germs."
        },
        {
          "id": "claim-2",
          "description": "Toothpaste helps avoid cavities,"
        }
      ]
    }
  }
}
```

Multi-Section

```json
{
  "id": "46754879",
  "channel": { "id": "Email", "name": "Email" },
  "brand": { "id": "brand-1", "name": "My Modern Brand" },
  "persona": { "id": "persona-1", "name": "Marketer" },
  "sections": [
    {
      "id": "1",
      "additionalContexts": {
        "claims": {
          "additionalContextType": "claims",
          "additionalContextValues": [
            {
              "id": "claim-1",
              "description": "Toothpaste can kill 98% of germs."
            }
          ]
        }
      },
      "product": {
        "id": "24345",
        "name": "My Toothpaste"
      }
    },
    {
      "id": "2",
      "additionalContexts": {
        "claims": {
          "additionalContextType": "claims",
          "additionalContextValues": [
            {
              "id": "claim-1",
              "description": "Toothpaste can kill 98% of germs."
            }
          ]
        }
      },
      "product": {
        "id": "24345",
        "name": "My Toothpaste"
      }
    }
  ]
}
```

---

### **AppMetaData**

The `AppMetaData` type contains metadata about an application, including supported channels.

Use `All` as the channel name to support all availabel channels on the GenStudio environment.

```typescript
type AppMetaData = {
  id: string; // Unique app ID.
  extensionId: string; // App Extension ID.
  iconDataUri: string; // Datauri of icon SVG.
  supportedChannels: Channel[]; // Array of supported channels.
};
```

**Example:**
Support all channels

```json
{
  "id": "7649838",
  "extensionId": "45637567658",
  "iconDataUri": "data:image/png;base64,...",
  "label": "test",
  "supportedChannels": [{ "id": "ALL", "name": "All Channels" }]
}
```

Support only some channels

```json
{
  "id": "7649838",
  "extensionId": "45637567658",
  "iconDataUri": "data:image/png;base64,...",
  "label": "test",
  "supportedChannels": [
    { "id": "Email", "name": "Email" },
    { "id": "Meta", "name": "Meta" }
  ]
}
```
