interface TreeNode {
  name: string;
  children: Map<string, TreeNode>;
  isFile: boolean;
}

function buildTree(paths: string[]): TreeNode {
  const root: TreeNode = { name: "root", children: new Map(), isFile: false };

  for (const filePath of paths) {
    const segments = filePath.replace(/\\/g, "/").split("/").filter(Boolean);
    let current = root;

    for (let i = 0; i < segments.length; i++) {
      const seg = segments[i];
      const isFile = i === segments.length - 1;

      if (!current.children.has(seg)) {
        current.children.set(seg, {
          name: seg,
          children: new Map(),
          isFile,
        });
      }
      current = current.children.get(seg)!;
    }
  }

  return root;
}

function renderNode(node: TreeNode, prefix: string, lines: string[]): void {
  const entries = Array.from(node.children.entries()).sort(
    ([aName, aNode], [bName, bNode]) => {
      if (aNode.isFile !== bNode.isFile) return aNode.isFile ? 1 : -1;
      return aName.localeCompare(bName);
    },
  );

  entries.forEach(([, child], index) => {
    const isLast = index === entries.length - 1;
    const connector = isLast ? "└── " : "├── ";
    const extension = child.isFile ? "" : "/";

    lines.push(`${prefix}${connector}${child.name}${extension}`);

    if (!child.isFile) {
      const newPrefix = prefix + (isLast ? "    " : "│   ");
      renderNode(child, newPrefix, lines);
    }
  });
}

export function buildDirectoryTree(paths: string[]): string {
  if (paths.length === 0) return "(no files)";

  const tree = buildTree(paths);
  const lines: string[] = [];

  const topLevelEntries = Array.from(tree.children.entries());

  if (topLevelEntries.length === 1 && !topLevelEntries[0][1].isFile) {
    const [rootName, rootNode] = topLevelEntries[0];
    lines.push(`${rootName}/`);
    renderNode(rootNode, "", lines);
  } else {
    lines.push("./");
    renderNode(tree, "", lines);
  }

  return lines.join("\n");
}

