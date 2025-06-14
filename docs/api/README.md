**@adobe/genstudio-extensibility-sdk**

***

# genstudio-extensibility-sdk
GenStudio Extensibility SDK

**This repo is still WIP. Please use caution and reach out to GS team before using**

## API Documentation
Please refer to the [API Documentation](https://opensource.adobe.com/genstudio-extensibility-sdk/) for more information.
## Usage
```
npm install @adobe/genstudio-extensibility-sdk
```
## Import
```ts
import { Experience, ExperienceField } from '@adobe/genstudio-extensibility-sdk'

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

Contributions are welcomed! Read the [Contributing Guide](_media/CONTRIBUTING.md) for more information.

## Licensing

This project is licensed under the Apache V2 License. See [LICENSE](_media/LICENSE) for more information.
