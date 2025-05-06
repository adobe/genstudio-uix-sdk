[**@adobe/genstudio-uix-sdk**](../README.md)

***

[@adobe/genstudio-uix-sdk](../globals.md) / AddContextApi

# Interface: AddContextApi

## Extends

- `VirtualApi`

## Indexable

\[`key`: `string`\]: `object` \| (...`args`: `unknown`[]) => `unknown`

## Properties

### api

> **api**: \{ `create`: \{ `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `updateAdditionalContext`: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `Promise`\<`void`\>; \}; \}

#### create

> **create**: \{ `getGenerationContext`: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>; `updateAdditionalContext`: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `Promise`\<`void`\>; \}

##### create.getGenerationContext()

> **getGenerationContext**: () => `Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

###### Returns

`Promise`\<[`GenerationContext`](../type-aliases/GenerationContext.md)\>

##### create.updateAdditionalContext()

> **updateAdditionalContext**: (`additionalContext`: [`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>) => `Promise`\<`void`\>

###### Parameters

###### additionalContext

[`AdditionalContext`](../type-aliases/AdditionalContext.md)\<`any`\>

###### Returns

`Promise`\<`void`\>
