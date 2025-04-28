/**
 * Database Service using Supabase
 * 
 * This service provides methods for database operations using Supabase PostgreSQL.
 * It includes methods for CRUD operations on various tables.
 */

import { supabase } from './supabaseService';

/**
 * Generic function to fetch data from a table
 * @param table Table name
 * @param columns Columns to select
 * @param filters Optional filters
 * @param options Optional query options
 * @returns Promise resolving to the data
 */
export const fetchData = async (
  table: string,
  columns: string = '*',
  filters?: Record<string, any>,
  options?: {
    limit?: number;
    offset?: number;
    orderBy?: { column: string; ascending?: boolean };
    relationships?: Array<{ table: string; columns: string; foreignKey: string }>;
  }
) => {
  let query = supabase
    .from(table)
    .select(columns);
  
  // Apply filters
  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query = query.eq(key, value);
      }
    });
  }
  
  // Apply options
  if (options) {
    if (options.limit) {
      query = query.limit(options.limit);
    }
    
    if (options.offset) {
      query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
    }
    
    if (options.orderBy) {
      query = query.order(options.orderBy.column, {
        ascending: options.orderBy.ascending !== false
      });
    }
  }
  
  const { data, error } = await query;
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * Fetch a single record by ID
 * @param table Table name
 * @param id Record ID
 * @param columns Columns to select
 * @returns Promise resolving to the record
 */
export const fetchById = async (
  table: string,
  id: string,
  columns: string = '*'
) => {
  const { data, error } = await supabase
    .from(table)
    .select(columns)
    .eq('id', id)
    .single();
  
  if (error) {
    throw error;
  }
  
  return data;
};

/**
 * Insert a record into a table
 * @param table Table name
 * @param record Record to insert
 * @returns Promise resolving to the inserted record
 */
export const insertRecord = async (
  table: string,
  record: Record<string, any>
) => {
  const { data, error } = await supabase
    .from(table)
    .insert(record)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

/**
 * Update a record in a table
 * @param table Table name
 * @param id Record ID
 * @param updates Updates to apply
 * @returns Promise resolving to the updated record
 */
export const updateRecord = async (
  table: string,
  id: string,
  updates: Record<string, any>
) => {
  const { data, error } = await supabase
    .from(table)
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select();
  
  if (error) {
    throw error;
  }
  
  return data[0];
};

/**
 * Delete a record from a table
 * @param table Table name
 * @param id Record ID
 * @returns Promise resolving when the record is deleted
 */
export const deleteRecord = async (
  table: string,
  id: string
) => {
  const { error } = await supabase
    .from(table)
    .delete()
    .eq('id', id);
  
  if (error) {
    throw error;
  }
};

/**
 * Execute a custom query using Supabase's PostgreSQL functions
 * @param functionName Function name
 * @param params Function parameters
 * @returns Promise resolving to the query result
 */
export const executeFunction = async (
  functionName: string,
  params?: Record<string, any>
) => {
  const { data, error } = await supabase
    .rpc(functionName, params);
  
  if (error) {
    throw error;
  }
  
  return data;
};
