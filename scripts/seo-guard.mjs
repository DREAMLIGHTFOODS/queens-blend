#!/usr/bin/env node

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import ts from "typescript";

const root = process.cwd();
const STRICT_CANONICAL_HOST = "https://thequeensblend.com";

function parseBooleanArg(rawValue) {
  if (typeof rawValue !== "string") {
    return null;
  }

  const normalized = rawValue.trim().toLowerCase();
  if (["true", "1", "yes", "on"].includes(normalized)) {
    return true;
  }

  if (["false", "0", "no", "off"].includes(normalized)) {
    return false;
  }

  return null;
}

function resolveStrictCanonicalMode(argv, env) {
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];

    if (argument === "--strict-canonical") {
      return true;
    }

    if (argument === "--no-strict-canonical") {
      return false;
    }

    if (argument.startsWith("--strict-canonical=")) {
      const value = argument.split("=").slice(1).join("=");
      const parsed = parseBooleanArg(value);
      if (parsed === null) {
        throw new Error(
          "Invalid value for --strict-canonical. Use true/false, 1/0, yes/no, or on/off.",
        );
      }
      return parsed;
    }

    if (argument === "--strict-canonical-mode") {
      const next = argv[index + 1];
      const parsed = parseBooleanArg(next);
      if (parsed === null) {
        throw new Error("Missing or invalid value for --strict-canonical-mode. Use true or false.");
      }
      return parsed;
    }
  }

  return String(env.CI).toLowerCase() === "true";
}

let strictCanonicalMode;
try {
  strictCanonicalMode = resolveStrictCanonicalMode(process.argv.slice(2), process.env);
} catch (error) {
  console.error(
    `ERROR ${error instanceof Error ? error.message : "Invalid strict canonical flag."}`,
  );
  process.exit(2);
}

const checks = [
  {
    name: "Homepage metadata",
    file: "app/(marketing)/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    strictCanonicalHost: true,
  },
  {
    name: "Products index metadata + breadcrumb",
    file: "app/(marketing)/products/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Product detail metadata + structured data",
    file: "app/(marketing)/products/[slug]/page.tsx",
    metadataSource: "function",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["Product", "BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Category metadata + FAQ",
    file: "app/(marketing)/products/category/[collection]/page.tsx",
    metadataSource: "function",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["CollectionPage", "BreadcrumbList", "FAQPage"],
    strictCanonicalHost: true,
  },
  {
    name: "Tea guide metadata + FAQ",
    file: "app/(marketing)/tea-guide/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["WebPage", "BreadcrumbList", "FAQPage"],
    strictCanonicalHost: true,
  },
  {
    name: "Business hub metadata + breadcrumb",
    file: "app/(marketing)/business/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["WebPage", "BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Business HORECA metadata + breadcrumb",
    file: "app/(marketing)/business/horeca/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Business private-label metadata + breadcrumb",
    file: "app/(marketing)/business/private-label/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Business bulk-supply metadata + breadcrumb",
    file: "app/(marketing)/business/bulk-supply/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Business export metadata + breadcrumb",
    file: "app/(marketing)/business/export/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Business contact metadata + breadcrumb",
    file: "app/(marketing)/business/contact/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "About metadata + webpage/breadcrumb",
    file: "app/(marketing)/about/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["WebPage", "BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Contact metadata + webpage/breadcrumb",
    file: "app/(marketing)/contact/page.tsx",
    metadataSource: "const",
    metadataFields: [["alternates", "canonical"], ["openGraph"], ["twitter"]],
    jsonLdTypes: ["WebPage", "BreadcrumbList"],
    strictCanonicalHost: true,
  },
  {
    name: "Global layout organization + website schema",
    file: "app/layout.tsx",
    requiredIdentifiers: ["DEFAULT_METADATA"],
    jsonLdTypes: ["Organization", "WebSite", "SearchAction"],
  },
  {
    name: "Sitemap coverage",
    file: "app/sitemap.ts",
    requiredIdentifiers: ["businessRoutes", "collectionRoutes", "productRoutes"],
    requiredStrings: ["thequeensblend.com"],
  },
  {
    name: "Robots coverage",
    file: "app/robots.ts",
    requiredStrings: ["sitemap", "host", "thequeensblend.com"],
  },
];

function unwrapExpression(node) {
  let current = node;
  while (
    current &&
    (ts.isAsExpression(current) ||
      ts.isTypeAssertionExpression(current) ||
      ts.isParenthesizedExpression(current) ||
      ts.isSatisfiesExpression(current))
  ) {
    current = current.expression;
  }
  return current;
}

function walk(node, visit) {
  visit(node);
  ts.forEachChild(node, (child) => walk(child, visit));
}

function hasExportModifier(node) {
  return Boolean(node.modifiers?.some((modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword));
}

function propertyNameToString(name) {
  if (!name) return null;
  if (ts.isIdentifier(name) || ts.isPrivateIdentifier(name)) return name.text;
  if (ts.isStringLiteral(name) || ts.isNumericLiteral(name)) return name.text;
  return null;
}

function getObjectProperty(objectLiteral, key) {
  for (const prop of objectLiteral.properties) {
    if (!ts.isPropertyAssignment(prop)) {
      continue;
    }
    if (propertyNameToString(prop.name) === key) {
      return prop;
    }
  }
  return null;
}

function objectHasPath(objectLiteral, path) {
  let current = objectLiteral;
  for (let i = 0; i < path.length; i += 1) {
    const prop = getObjectProperty(current, path[i]);
    if (!prop) {
      return false;
    }

    if (i === path.length - 1) {
      return true;
    }

    const next = unwrapExpression(prop.initializer);
    if (!ts.isObjectLiteralExpression(next)) {
      return false;
    }
    current = next;
  }
  return false;
}

function getObjectPropertyInitializerByPath(objectLiteral, path) {
  let current = objectLiteral;

  for (let i = 0; i < path.length; i += 1) {
    const prop = getObjectProperty(current, path[i]);
    if (!prop) {
      return null;
    }

    const init = unwrapExpression(prop.initializer);
    if (i === path.length - 1) {
      return init;
    }

    if (!ts.isObjectLiteralExpression(init)) {
      return null;
    }

    current = init;
  }

  return null;
}

function expressionMentionsSiteUrl(node) {
  let found = false;

  walk(node, (child) => {
    if (
      ts.isPropertyAccessExpression(child) &&
      ts.isIdentifier(child.expression) &&
      child.expression.text === "SITE" &&
      child.name.text === "url"
    ) {
      found = true;
    }
  });

  return found;
}

function isCanonicalHostValid(expression) {
  const expr = unwrapExpression(expression);

  if (ts.isStringLiteral(expr) || ts.isNoSubstitutionTemplateLiteral(expr)) {
    return expr.text.startsWith(STRICT_CANONICAL_HOST);
  }

  if (ts.isTemplateExpression(expr)) {
    if (expr.head.text.startsWith(STRICT_CANONICAL_HOST)) {
      return true;
    }

    return expressionMentionsSiteUrl(expr);
  }

  if (ts.isBinaryExpression(expr) && expr.operatorToken.kind === ts.SyntaxKind.PlusToken) {
    const combinedText = expr.getText();
    return (
      combinedText.includes(STRICT_CANONICAL_HOST) ||
      combinedText.includes("SITE.url") ||
      expressionMentionsSiteUrl(expr)
    );
  }

  if (ts.isPropertyAccessExpression(expr)) {
    return (
      ts.isIdentifier(expr.expression) &&
      expr.expression.text === "SITE" &&
      expr.name.text === "url"
    );
  }

  return false;
}

function getExportedConstObject(sourceFile, identifier) {
  for (const statement of sourceFile.statements) {
    if (!ts.isVariableStatement(statement) || !hasExportModifier(statement)) {
      continue;
    }

    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== identifier) {
        continue;
      }

      if (!declaration.initializer) {
        continue;
      }

      const init = unwrapExpression(declaration.initializer);
      if (ts.isObjectLiteralExpression(init)) {
        return init;
      }
    }
  }

  return null;
}

function getExportedFunctionNodes(sourceFile, functionName) {
  const nodes = [];

  for (const statement of sourceFile.statements) {
    if (ts.isFunctionDeclaration(statement) && hasExportModifier(statement)) {
      if (statement.name?.text === functionName) {
        nodes.push(statement);
      }
    }

    if (ts.isVariableStatement(statement) && hasExportModifier(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || declaration.name.text !== functionName) {
          continue;
        }

        if (!declaration.initializer) {
          continue;
        }

        const init = unwrapExpression(declaration.initializer);
        if (ts.isArrowFunction(init) || ts.isFunctionExpression(init)) {
          nodes.push(init);
        }
      }
    }
  }

  return nodes;
}

function getReturnObjectLiterals(functionNode) {
  const objects = [];
  if (!functionNode.body) {
    return objects;
  }

  walk(functionNode.body, (node) => {
    if (!ts.isReturnStatement(node) || !node.expression) {
      return;
    }
    const expr = unwrapExpression(node.expression);
    if (ts.isObjectLiteralExpression(expr)) {
      objects.push(expr);
    }
  });

  return objects;
}

function collectVariableObjectInitializers(sourceFile) {
  const map = new Map();

  walk(sourceFile, (node) => {
    if (!ts.isVariableDeclaration(node) || !ts.isIdentifier(node.name) || !node.initializer) {
      return;
    }

    const init = unwrapExpression(node.initializer);
    if (ts.isObjectLiteralExpression(init)) {
      map.set(node.name.text, init);
    }
  });

  return map;
}

function collectTypeValuesRecursive(node, typesSet) {
  if (ts.isObjectLiteralExpression(node)) {
    for (const prop of node.properties) {
      if (ts.isPropertyAssignment(prop)) {
        const name = propertyNameToString(prop.name);
        const initializer = unwrapExpression(prop.initializer);

        if (name === "@type") {
          if (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) {
            typesSet.add(initializer.text);
          }
        } else {
          collectTypeValuesRecursive(initializer, typesSet);
        }
      }
    }
    return;
  }

  if (ts.isArrayLiteralExpression(node)) {
    for (const item of node.elements) {
      collectTypeValuesRecursive(unwrapExpression(item), typesSet);
    }
  }
}

function collectJsonLdTypes(sourceFile) {
  const variableObjects = collectVariableObjectInitializers(sourceFile);
  const types = new Set();

  walk(sourceFile, (node) => {
    const isJsxElement =
      ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node) || ts.isJsxElement(node);

    if (!isJsxElement) {
      return;
    }

    const opening = ts.isJsxElement(node) ? node.openingElement : node;
    const tagName = opening.tagName.getText(sourceFile);
    if (tagName !== "JsonLd") {
      return;
    }

    const dataAttr = opening.attributes.properties.find(
      (attr) => ts.isJsxAttribute(attr) && attr.name.text === "data",
    );

    if (!dataAttr || !ts.isJsxAttribute(dataAttr) || !dataAttr.initializer) {
      return;
    }

    if (!ts.isJsxExpression(dataAttr.initializer) || !dataAttr.initializer.expression) {
      return;
    }

    const expr = unwrapExpression(dataAttr.initializer.expression);

    if (ts.isObjectLiteralExpression(expr)) {
      collectTypeValuesRecursive(expr, types);
      return;
    }

    if (ts.isIdentifier(expr)) {
      const declaredObject = variableObjects.get(expr.text);
      if (declaredObject) {
        collectTypeValuesRecursive(declaredObject, types);
      }
    }
  });

  return types;
}

function collectIdentifierNames(sourceFile) {
  const identifiers = new Set();
  walk(sourceFile, (node) => {
    if (ts.isIdentifier(node)) {
      identifiers.add(node.text);
    }
  });
  return identifiers;
}

function createAst(filePath) {
  const content = readFileSync(filePath, "utf8");
  const sourceFile = ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    ts.ScriptKind.TSX,
  );
  return { content, sourceFile };
}

let failed = 0;

for (const check of checks) {
  const fullPath = resolve(root, check.file);

  if (!existsSync(fullPath)) {
    failed += 1;
    console.error(`FAIL ${check.name}: missing file ${check.file}`);
    continue;
  }

  const { content, sourceFile } = createAst(fullPath);
  const missing = [];

  if (check.metadataSource === "const") {
    const metadataObject = getExportedConstObject(sourceFile, "metadata");
    if (!metadataObject) {
      missing.push("exported metadata object");
    } else {
      for (const path of check.metadataFields ?? []) {
        if (!objectHasPath(metadataObject, path)) {
          missing.push(`metadata field: ${path.join(".")}`);
        }
      }

      if (strictCanonicalMode && check.strictCanonicalHost) {
        const canonicalExpression = getObjectPropertyInitializerByPath(metadataObject, [
          "alternates",
          "canonical",
        ]);

        if (!canonicalExpression || !isCanonicalHostValid(canonicalExpression)) {
          missing.push(`canonical host must match ${STRICT_CANONICAL_HOST}`);
        }
      }
    }
  }

  if (check.metadataSource === "function") {
    const metadataFunctions = getExportedFunctionNodes(sourceFile, "generateMetadata");
    if (metadataFunctions.length === 0) {
      missing.push("exported generateMetadata function");
    } else {
      const hasAllFields = metadataFunctions.some((fnNode) => {
        const returnedObjects = getReturnObjectLiterals(fnNode);
        return returnedObjects.some((obj) =>
          (check.metadataFields ?? []).every((path) => objectHasPath(obj, path)),
        );
      });

      if (!hasAllFields) {
        for (const path of check.metadataFields ?? []) {
          missing.push(`metadata field in generateMetadata return: ${path.join(".")}`);
        }
      }

      if (strictCanonicalMode && check.strictCanonicalHost) {
        const hasValidCanonicalHost = metadataFunctions.some((fnNode) => {
          const returnedObjects = getReturnObjectLiterals(fnNode);

          return returnedObjects.some((obj) => {
            const canonicalExpression = getObjectPropertyInitializerByPath(obj, [
              "alternates",
              "canonical",
            ]);

            return canonicalExpression && isCanonicalHostValid(canonicalExpression);
          });
        });

        if (!hasValidCanonicalHost) {
          missing.push(`canonical host must match ${STRICT_CANONICAL_HOST}`);
        }
      }
    }
  }

  if (check.jsonLdTypes?.length) {
    const jsonLdTypes = collectJsonLdTypes(sourceFile);
    for (const typeName of check.jsonLdTypes) {
      if (!jsonLdTypes.has(typeName)) {
        missing.push(`JsonLd type: ${typeName}`);
      }
    }
  }

  if (check.requiredIdentifiers?.length) {
    const identifiers = collectIdentifierNames(sourceFile);
    for (const identifier of check.requiredIdentifiers) {
      if (!identifiers.has(identifier)) {
        missing.push(`identifier: ${identifier}`);
      }
    }
  }

  if (check.requiredStrings?.length) {
    for (const literalText of check.requiredStrings) {
      if (!content.includes(literalText)) {
        missing.push(`string: ${literalText}`);
      }
    }
  }

  if (missing.length > 0) {
    failed += 1;
    console.error(`FAIL ${check.name}: ${check.file}`);
    for (const item of missing) {
      console.error(`  - missing: ${item}`);
    }
  } else {
    console.log(`PASS ${check.name}`);
  }
}

console.log(
  `Mode: strict-canonical=${strictCanonicalMode ? "enabled" : "disabled"} (default: CI=true enables strict mode).`,
);

if (failed > 0) {
  console.error(`\nSEO guard failed with ${failed} failing check(s).`);
  process.exit(1);
}

console.log("\nSEO guard passed.");
