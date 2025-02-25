# genstudio-uix-sdk
GenStudio UI Extensibility SDK
**This repo is still WIP. Please use caution and reach out to GS team before using**

## API Documentation
[API Doc](./api/README.md)

## Usage
```
npm install @adobe/genstudio-uix-sdk
```
## Import
```ts
import { Experience, ExperienceField } from '@adobe/genstudio-uix-sdk'

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
```

## Contributing

Contributions are welcomed! Read the [Contributing Guide](./.github/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](./LICENSE) for more information.
