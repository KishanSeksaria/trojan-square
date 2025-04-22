/**
 * Utility functions for Convex backend operations
 * This file provides type-safe wrappers around Convex's query and mutation functions
 * using zod for validation and Convex Helpers for improved developer experience.
 */
import {
  query,
  mutation,
  internalMutation,
  internalQuery,
  internalAction
} from './_generated/server'
import { NoOp } from 'convex-helpers/server/customFunctions'
import {
  zCustomMutation,
  zCustomQuery,
  zCustomAction
} from 'convex-helpers/server/zod'

/**
 * Creates a type-safe, zod-validated public query function
 * These queries are accessible from the client and can read from the database
 */
export const zQuery = zCustomQuery(query, NoOp)

/**
 * Creates a type-safe, zod-validated public mutation function
 * These mutations are accessible from the client and can modify the database
 */
export const zMutation = zCustomMutation(mutation, NoOp)

/**
 * Creates a type-safe, zod-validated internal query function
 * These queries are only accessible from other Convex functions (not from clients)
 */
export const zInternalQuery = zCustomQuery(internalQuery, NoOp)

/**
 * Creates a type-safe, zod-validated internal mutation function
 * These mutations are only accessible from other Convex functions (not from clients)
 */
export const zInternalMutation = zCustomMutation(internalMutation, NoOp)

/**
 * Creates a type-safe, zod-validated internal action function
 * These actions are only accessible from other Convex functions (not from clients)
 */
export const zInternalAction = zCustomAction(internalAction, NoOp)
