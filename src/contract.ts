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

/* this file defines types and interfaces that are considered as api for extension consumers */

/** Experience */
/**
 * Represents the role of a field within an experience.
 */
export type FieldRole = {
  /** The name of the field role. */
  name: string;
};

export type ExperienceField = {
  fieldRole: FieldRole;
  fieldName: string;
  fieldValue: string | Object;
  readonly: boolean;
};

export type Experience = {
  id: string;
  experienceFields: Map<string, ExperienceField>;
};

/** Generation Context */

export const Email: Channel = {
  id: "email",
  name: "Email",
};

export const Meta: Channel = {
  id: "meta",
  name: "Meta",
};

export const Display: Channel = {
  id: "display",
  name: "Display",
};

export type Channel = {
  id: string;
  name: string;
};

export type Brand = {
  id: string;
  name: string;
};

export type Persona = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
};

export type Claim = {
  id: string;
  description: string;
};

export enum AdditionalContextTypes {
  Claims = "claims",
}

export type AdditionalContextValues<T> = T[];

export type AdditionalContext<T> = {
  additionalContextType: AdditionalContextTypes;
  additionalContextValues: AdditionalContextValues<T>;
};

export type SectionGenerationContext = {
  id: string;
  additionalContexts: Map<string, AdditionalContext<any>>;
  product: Product;
};

export type GenerationContext = {
  id: string;
  channel: Channel;
  additionalContexts?: Map<string, AdditionalContext<any>>;
  brand: Brand;
  product?: Product;
  persona: Persona;
  sections?: SectionGenerationContext[] | undefined;
};
/** App MetaData */
export type AppMetaData = {
  id: string;
  extensionId: string;
  iconDataUri: string;
  supportedChannels: Channel[];
  label: string;
};
