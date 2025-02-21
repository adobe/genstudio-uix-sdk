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

> `static` **setAdditionalContext**(`connection`: `GuestUI`\<`CreateApi`\>, `extensionId`: `string`, `contextType`: [`Claims`](../enumerations/AdditionalContextTypes.md#claims), `additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<[`Claim`](../type-aliases/Claim.md)\>): `Promise`\<`void`\>

Sets additional context on the prompt

#### Parameters

##### connection

`GuestUI`\<`CreateApi`\>

The guest connection to the host

##### extensionId

`string`

The extension id

##### contextType

[`Claims`](../enumerations/AdditionalContextTypes.md#claims)

The context type

##### additionalContext

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<[`Claim`](../type-aliases/Claim.md)\>

The additional context

#### Returns

`Promise`\<`void`\>

void

#### Throws

Error if connection is missing
