import {
  query,
  mutation,
  internalMutation,
  internalQuery
} from './_generated/server'
import { NoOp } from 'convex-helpers/server/customFunctions'
import { zCustomMutation, zCustomQuery } from 'convex-helpers/server/zod'

export const zQuery = zCustomQuery(query, NoOp)
export const zMutation = zCustomMutation(mutation, NoOp)
export const zInternalQuery = zCustomQuery(internalQuery, NoOp)
export const zInternalMutation = zCustomMutation(internalMutation, NoOp)
