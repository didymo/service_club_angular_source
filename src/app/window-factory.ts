/**
 * Creates an instance of a window object (I think, at least that is what factory implies).
 * This is used for syntax magic in the .module file so that we can access the window object
 * that has it's variables set by the Drupal module.
 * There were attempts to use the useValue way of handling things, but these failed and we are now using useFactory.
 */
export function windowFactory(): any {
  return window['drupalSettings']['app_data'];
}
