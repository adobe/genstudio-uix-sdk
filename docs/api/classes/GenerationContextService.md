[**@adobe/genstudio-uix-sdk**](../README.md)

***

[@adobe/genstudio-uix-sdk](../globals.md) / GenerationContextService

# Class: GenerationContextService

## Constructors

### new GenerationContextService()

> **new GenerationContextService**(): [`GenerationContextService`](GenerationContextService.md)

#### Returns

[`GenerationContextService`](GenerationContextService.md)

## Methods

### getGenerationContext()

> `static` **getGenerationContext**(`connection`: `GuestUI`\<[`CreateApi`](../interfaces/CreateApi.md)\>): `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

Gets the generation context

#### Parameters

##### connection

`GuestUI`\<[`CreateApi`](../interfaces/CreateApi.md)\>

The guest connection to the host

#### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

The generation context

#### Throws

Error if connection is missing

***

### setAdditionalContext()

> `static` **setAdditionalContext**(`connection`: `GuestUI`\<[`CreateApi`](../interfaces/CreateApi.md)\>, `additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>): `Promise`\<`void`\>

Sets additional context on the prompt

#### Parameters

##### connection

`GuestUI`\<[`CreateApi`](../interfaces/CreateApi.md)\>

The guest connection to the host

##### additionalContext

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>

The additional context object

#### Returns

`Promise`\<`void`\>

void

#### Throws

Error if connection is missing
