[**@adobe/genstudio-uix-sdk**](../README.md)

***

[@adobe/genstudio-uix-sdk](../globals.md) / RightPanelService

# Class: RightPanelService

Manages right panel data conversion and retrieval

## Constructors

### new RightPanelService()

> **new RightPanelService**(): [`RightPanelService`](RightPanelService.md)

#### Returns

[`RightPanelService`](RightPanelService.md)

## Methods

### convertRawExperiencesToExperiences()

> `static` **convertRawExperiencesToExperiences**(`rawExperiences`: `any`[]): [`Experience`](../interfaces/Experience.md)[]

Converts an array of raw experiences to Experience format

#### Parameters

##### rawExperiences

`any`[]

Array of raw experience data

#### Returns

[`Experience`](../interfaces/Experience.md)[]

Experience[] - Array of converted Experience objects

***

### convertRawExperienceToExperience()

> `static` **convertRawExperienceToExperience**(`rawExperience`: \{ `fields`: \{\}; `id`: `string`; \}): [`Experience`](../interfaces/Experience.md)

Converts a raw experience object to Experience format

#### Parameters

##### rawExperience

Raw experience data from the host

###### fields

\{\}

###### id

`string`

#### Returns

[`Experience`](../interfaces/Experience.md)

Experience - Converted Experience object

***

### getExperiences()

> `static` **getExperiences**(`connection`: `GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>): `Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Fetches experiences from the connection

#### Parameters

##### connection

`GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>

The guest connection to the host

#### Returns

`Promise`\<[`Experience`](../interfaces/Experience.md)[]\>

Promise<Experience[]> Array of converted experiences

#### Throws

Error if connection is missing

***

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

#### Parameters

##### connection

`GuestUI`\<[`RightPanelApi`](../interfaces/RightPanelApi.md)\>

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>
