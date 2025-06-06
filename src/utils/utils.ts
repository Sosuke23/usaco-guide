import MODULE_ORDERING from '../../content/ordering';
import { ModuleInfo } from '../models/module';

export const getModulesForDivision = (
  allModules: {
    [key: string]: Queries.SyllabusQuery['modules']['nodes'][0];
  },
  division: keyof typeof MODULE_ORDERING
) => {
  return MODULE_ORDERING[division].map(k => ({
    name: k.name,
    items: k.items.map(k2 => {
      if (!allModules.hasOwnProperty(k2)) {
        throw 'Module not found: ' + k2;
      }
      return {
        ...allModules[k2 as string],
        slug: `/${division}/${allModules[k2 as string].frontmatter.id}`,
      };
    }),
    description: k.description,
  }));
};

export function graphqlToModuleInfo(mdx): ModuleInfo {
  return new ModuleInfo(
    mdx.frontmatter.id,
    mdx.fields.division,
    mdx.frontmatter.title,
    mdx.body,
    mdx.frontmatter.author,
    mdx.frontmatter.contributors,
    mdx.frontmatter.prerequisites,
    mdx.frontmatter.description,
    mdx.frontmatter.frequency,
    mdx.toc,
    mdx.parent.relativePath,
    mdx.fields.gitAuthorTime
  );
}

// https://stackoverflow.com/questions/2218999/how-to-remove-all-duplicates-from-an-array-of-objects
export function removeDuplicates<T>(arr: T[]): T[] {
  return [...new Map(arr.map(item => [JSON.stringify(item), item])).values()];
}
