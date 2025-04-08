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
/* this file defines types and interfaces that are considered as Experience api for extension consumers */

/**
 * Represents an Experience entity in the system.
 * An Experience is a container for various fields that define its characteristics.
 */
export interface Experience {
    /** Unique identifier for the experience */
    id: string;
    /** Collection of experience fields stored as key-value pairs */
    experienceFields: Record<string, ExperienceField>;
}

/**
 * Represents a field within an Experience.
 * Each field contains a name and corresponding value.
 */
export interface ExperienceField {
    /** Name of the experience field */
    fieldName: string;
    /** Value associated with the experience field */
    fieldValue: string;
}
