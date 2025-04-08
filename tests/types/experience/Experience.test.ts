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

import { Experience, ExperienceField } from '../../../src/types/experience/Experience';

describe('Experience Types', () => {

  it("should define ExperienceField with string value", () => {
    const experienceField: ExperienceField = {
      fieldName: "subject",
      fieldValue: "test field value"
    };
    expect(experienceField).toBeDefined();
    expect(experienceField.fieldName).toBe("subject");
    expect(experienceField.fieldValue).toBe("test field value");
  });

  it("should define Experience with fields", () => {
    const experienceFields: Record<string, ExperienceField> = {
      subject: {
        fieldName: "subject",
        fieldValue: "test field value"
      },
      section2_image: {
        fieldName: "section2_image",
        fieldValue: '{"test":"1"}'
      }
    };

    const experience: Experience = {
      id: "230853274642",
      experienceFields
    };

    expect(experience).toBeDefined();
    expect(experience.id).toBe("230853274642");
    expect(Object.keys(experience.experienceFields).length).toBe(2);
    expect(experience.experienceFields.subject.fieldValue).toBe("test field value");
    expect(experience.experienceFields.section2_image.fieldValue).toBe('{"test":"1"}');
  });
});