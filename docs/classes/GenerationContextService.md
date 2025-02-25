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
