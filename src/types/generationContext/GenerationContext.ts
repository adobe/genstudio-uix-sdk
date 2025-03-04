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

import { Channel } from "../channel/Channel";
/* this file defines types and interfaces that are considered as api for extension consumers */

/** Generation Context */

export type Brand = {
  id: string;
  name?: string;
};

export type Persona = {
  id: string;
  name?: string;
};

export type Product = {
  id: string;
  name?: string;
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
  extensionId: string;
  additionalContextType: AdditionalContextTypes;
  additionalContextValues: AdditionalContextValues<T>;
};

export type SectionGenerationContext = {
  id: string;
  additionalContexts?: Record<string, AdditionalContext<any>>;
  product?: Product;
};

export type GenerationContext = {
  id: string;
  userPrompt: string;
  channel?: Channel;
  additionalContexts?: Record<string, AdditionalContext<any>>;
  brand?: Brand;
  product?: Product;
  persona?: Persona;
  sections?: SectionGenerationContext[] | undefined;
};
