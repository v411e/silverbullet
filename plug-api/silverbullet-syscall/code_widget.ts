import type { CodeWidgetContent } from "$sb/types.ts";
import { syscall } from "./syscall.ts";

export function render(
  lang: string,
  body: string,
  pageName: string,
): Promise<CodeWidgetContent> {
  return syscall("codeWidget.render", lang, body, pageName);
}

// Refresh all code widgets on the page that support it
export function refreshAll() {
  return syscall("codeWidget.refreshAll");
}
