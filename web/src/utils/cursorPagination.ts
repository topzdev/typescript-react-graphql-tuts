import { stringifyVariables } from "@urql/core";
import { Resolver, Variables, NullArray } from "@urql/exchange-graphcache";
export interface PaginationParams {
  offsetArgument?: string;
  limitArgument?: string;
}

export const cursorPagination = (): Resolver => {
  return (_parent, fieldArgs, cache, info) => {
    const { parentKey: entityKey, fieldName } = info;

    console.log("entity key", entityKey);

    const allFields = cache.inspectFields(entityKey);

    console.log("All fields", allFields);

    console.log("Field Args", fieldArgs);

    const fieldInfos = allFields.filter(
      (info: any) => info.fieldName === fieldName
    );
    const size = fieldInfos.length;
    if (size === 0) {
      return undefined;
    }

    const fieldKey = `${fieldName}(${stringifyVariables(fieldArgs)})`;
    const isItTheCache = cache.resolve(
      cache.resolveFieldByKey(entityKey, fieldKey) as string,
      "posts"
    );

    info.partial = !isItTheCache;

    const results: string[] = [];

    let hasMore = true;

    fieldInfos.map((fi) => {
      const key = cache.resolveFieldByKey(entityKey, fi.fieldKey) as string;
      const data = cache.resolve(key, "posts") as string[];
      const _hasMore = cache.resolve(key, "hasMore");

      if (_hasMore) {
        hasMore = _hasMore as boolean;
      }
      console.log("data :", data);
      results.push(...data);
    });

    return {
      __typename: "PaginatedPosts",
      hasMore: true,
      posts: results,
    };

    //     const visited = new Set();
    //     let result: NullArray<string> = [];
    //     let prevOffset: number | null = null;

    //     for (let i = 0; i < size; i++) {
    //       const { fieldKey, arguments: args } = fieldInfos[i];
    //       if (args === null || !compareArgs(fieldArgs, args)) {
    //         continue;
    //       }

    //       const links = cache.resolveFieldByKey(entityKey, fieldKey) as string[];
    //       const currentOffset = args[offsetArgument];

    //       if (
    //         links === null ||
    //         links.length === 0 ||
    //         typeof currentOffset !== "number"
    //       ) {
    //         continue;
    //       }

    //       if (!prevOffset || currentOffset > prevOffset) {
    //         for (let j = 0; j < links.length; j++) {
    //           const link = links[j];
    //           if (visited.has(link)) continue;
    //           result.push(link);
    //           visited.add(link);
    //         }
    //       } else {
    //         const tempResult: NullArray<string> = [];
    //         for (let j = 0; j < links.length; j++) {
    //           const link = links[j];
    //           if (visited.has(link)) continue;
    //           tempResult.push(link);
    //           visited.add(link);
    //         }
    //         result = [...tempResult, ...result];
    //       }

    //       prevOffset = currentOffset;
    //     }

    //     const hasCurrentPage = cache.resolve(entityKey, fieldName, fieldArgs);
    //     if (hasCurrentPage) {
    //       return result;
    //     } else if (!(info as any).store.schema) {
    //       return undefined;
    //     } else {
    //       info.partial = true;
    //       return result;
    //     }
  };
};
