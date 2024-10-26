/*
 * Project Name : "Aerosphare Suit"
 *
 * Author: Abu Sayed Polin
 * Copyright : "Brotecs Technologies Limited"
 *
 * Created: 2023-09-28 23:46:42
 * Modified: 2023-09-28 23:46:42
 *
 * Component: App
 * Description: A utility function to introduce a delay using Promises.
 */

// -----------------------------------------------------------------------------
// Function: delay
// Purpose: Introduce a delay of a specified time using Promises.
// Parameters:
// - time: The time to delay in milliseconds.
// Returns: A Promise that resolves after the specified time.
// -----------------------------------------------------------------------------
export const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(() => resolve(true), time));
};
