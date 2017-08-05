import path from "path";
import _ from "lodash";
import { version } from "../package.json";

const packageName = "theme-themer-vscode";
const themesDirectory = "themes";
const getThemeFileName = theme => `themer-${theme}-color-theme.json`;
const getHumanTheme = theme => (theme === "dark" ? "Dark" : "Light");
const getDark = colorSet =>
  colorSet.theme === "dark" ? colorSet.colors.shade0 : colorSet.colors.shade7;

export const toColorSets = colors =>
  Object.entries(colors).map(([theme, colors]) => ({
    theme,
    colors
  }));

export const render = colors => {
  const colorSets = toColorSets(colors);
  return [renderPackageJsonFile(colorSets), ...renderThemeFiles(colorSets)];
};

const renderPackageJsonFile = colorSets =>
  Promise.resolve({
    name: path.join(packageName, "package.json"),
    contents: Buffer.from(
      JSON.stringify(
        {
          name: packageName,
          displayName: "Themer VS Code Themes",
          description: "Personal theme generated by themer",
          version,
          publisher: "Themer User",
          engines: {
            vscode: "^1.14.0"
          },
          categories: ["Themes"],
          contributes: {
            themes: colorSets.map(colorSet => ({
              label: `Themer ${getHumanTheme(colorSet.theme)}`,
              uiTheme: `vs-${colorSet.theme}`,
              path: path.join(
                ".",
                themesDirectory,
                getThemeFileName(colorSet.theme)
              )
            }))
          }
        },
        null,
        2
      )
    )
  });

const renderThemeFiles = colorSets =>
  colorSets.map(colorSet => {
    const {
      shade0,
      shade1,
      shade2,
      shade3,
      shade4,
      shade5,
      shade6,
      shade7,
      accent0,
      accent1,
      accent2,
      accent3,
      accent4,
      accent5,
      accent6,
      accent7
    } = colorSet.colors;
    const shadow = `${getDark(colorSet)}66`;
    return Promise.resolve({
      name: path.join(
        packageName,
        themesDirectory,
        getThemeFileName(colorSet.theme)
      ),
      contents: Buffer.from(
        JSON.stringify(
          {
            name: `Themer ${getHumanTheme(colorSet.theme)}`,
            type: colorSet.theme,
            colors: {
              // Base colors
              focusBorder: accent6,
              foreground: shade7,
              "widget.shadow": shadow,
              "selection.background": shade2,
              errorForeground: accent0,

              // Button control
              "button.background": accent5,
              "button.foreground": shade0,
              "button.hoverBackground": accent4,

              // Dropdown control
              "dropdown.background": shade1,
              "dropdown.border": shade1,
              "dropdown.foreground": shade6,

              // Input control
              "input.background": shade1,
              "input.border": shade1,
              "input.foreground": shade6,
              "input.placeholderForeground": shade2,
              "inputOption.activeBorder": accent4,
              "inputValidation.errorBackground": shade1, // TODO: after nailing down a general look, start to abstract these out semantically
              "inputValidation.errorBorder": accent0,
              "inputValidation.infoBackground": shade1,
              "inputValidation.infoBorder": accent5,
              "inputValidation.warningBackground": shade1,
              "inputValidation.warningBorder": accent1,

              // Scroll bar control
              "scrollbar.shadow": shadow,
              "scrollbarSlider.activeBackground": shade3,
              "scrollbarSlider.background": shade1,
              "scrollbarSlider.hoverBackground": shade2,

              // Badge
              "badge.foreground": shade7,
              "badge.background": accent6,

              // Progress bar
              "progressBar.background": accent3,

              // Lists and trees
              "list.activeSelectionBackground": accent3,
              "list.activeSelectionForeground": shade7,
              "list.dropBackground": shade3,
              "list.focusBackground": accent3,
              "list.highlightForeground": accent2,
              "list.hoverBackground": shade1,
              "list.inactiveSelectionBackground": shade3,
              "list.inactiveSelectionForeground": shade7,
              "list.hoverForeground": shade5,
              "list.focusForeground": shade6,

              // Activity bar
              "activityBar.background": shade0,
              "activityBar.dropBackground": shade1,
              "activityBar.foreground": shade5,
              "activityBar.border": shade0,
              "activityBarBadge.background": accent6,
              "activityBarBadge.foreground": shade7,

              // Side bar
              "sideBar.background": shade0,
              "sideBar.foreground": shade6,
              "sideBar.border": shade0,
              "sideBarTitle.foreground": shade7,
              "sideBarSectionHeader.background": shade1,
              "sideBarSectionHeader.foreground": shade5,

              // Editor groups & tabs
              "editorGroup.background": shade0,
              "editorGroup.border": shade1,
              "editorGroup.dropBackground": shade2,
              "editorGroupHeader.noTabsBackground": shade0,
              "editorGroupHeader.tabsBackground": shade1,
              "editorGroupHeader.tabsBorder": shade1,
              "tab.activeBackground": shade0,
              "tab.activeForeground": shade7,
              "tab.border": shade0,
              "tab.inactiveBackground": shade1,
              "tab.inactiveForeground": shade4,
              "tab.unfocusedActiveForeground": shade1,
              "tab.unfocusedInactiveForeground": shade3,

              // Editor colors
              "editor.background": shade0,
              "editor.foreground": shade7,
              "editorLineNumber.foreground": shade2,
              "editorCursor.foreground": accent6,
              "editor.selectionBackground": `${accent5}55`,
              "editor.selectionHighlightBackground": shade1,
              "editor.inactiveSelectionBackground": `${accent5}33`,
              "editor.wordHighlightBackground": `${accent6}7f`,
              "editor.wordHighlightStrongBackground": `${accent7}7f`,
              "editor.findMatchBackground": accent2,
              "editor.findMatchHighlightBackground": `${accent2}7f`,
              "editor.findRangeHighlightBackground": shade1,
              "editor.hoverHighlightBackground": shade2,
              "editor.lineHighlightBackground": shade1,
              "editor.lineHighlightBorder": shade1,
              "editorLink.activeForeground": accent4,
              "editor.rangeHighlightBackground": accent2,
              "editorWhitespace.foreground": shade1,
              "editorIndentGuide.background": shade1,
              "editorRuler.foreground": shade1,
              "editorCodeLens.foreground": shade5,
              "editorBracketMatch.background": shade1,
              "editorBracketMatch.border": shade1,
              "editorOverviewRuler.border": shade1,
              "editorError.foreground": accent0,
              "editorError.border": shade7,
              "editorWarning.foreground": accent1,
              "editorWarning.border": shade6,
              "editorGutter.background": shade0,
              "editorGutter.modifiedBackground": accent2,
              "editorGutter.addedBackground": accent3,
              "editorGutter.deletedBackground": accent0,

              // Diff editor colors
              "diffEditor.insertedTextBackground": `${accent3}55`,
              "diffEditor.insertedTextBorder": accent3,
              "diffEditor.removedTextBackground": `${accent0}55`,
              "diffEditor.removedTextBorder": accent0,

              // Editor widget colors
              "editorWidget.background": shade1,
              "editorWidget.border": shade1,
              "editorSuggestWidget.background": shade1,
              "editorSuggestWidget.border": shade1,
              "editorSuggestWidget.foreground": shade6,
              "editorSuggestWidget.highlightForeground": accent7,
              "editorSuggestWidget.selectedBackground": shade2,
              "editorHoverWidget.background": shade1,
              "editorHoverWidget.border": shade1,
              "debugExceptionWidget.background": shade1,
              "debugExceptionWidget.border": shade1,
              "editorMarkerNavigation.background": shade1,
              "editorMarkerNavigationError.background": accent0,
              "editorMarkerNavigationWarning.background": accent1,

              // Peek view colors
              "peekView.border": accent7,
              "peekViewEditor.background": shade1,
              "peekViewEditorGutter.background": shade1,
              "peekViewEditor.matchHighlightBackground": accent2,
              "peekViewResult.background": shade1,
              "peekViewResult.fileForeground": shade6,
              "peekViewResult.lineForeground": shade2,
              "peekViewResult.matchHighlightBackground": accent2,
              "peekViewResult.selectionBackground": shade3,
              "peekViewResult.selectionForeground": shade7,
              "peekViewTitle.background": shade2,
              "peekViewTitleDescription.foreground": shade5,
              "peekViewTitleLabel.foreground": shade7,

              // Merge conflicts
              "merge.currentHeaderBackground": accent4,
              "merge.currentContentBackground": `${accent4}7f`,
              "merge.incomingHeaderBackground": accent5,
              "merge.incomingContentBackground": `${accent5}7f`,
              "merge.border": shade4,
              "editorOverviewRuler.currentContentForeground": accent4,
              "editorOverviewRuler.incomingContentForeground": accent5,

              // Panel colors
              "panel.background": shade0,
              "panel.border": shade1,
              "panelTitle.activeBorder": shade3,
              "panelTitle.activeForeground": shade6,
              "panelTitle.inactiveForeground": shade4,

              // Status bar colors
              "statusBar.background": accent5,
              "statusBar.foreground": shade7,
              "statusBar.debuggingBackground": accent1,
              "statusBar.debuggingForeground": shade7,
              "statusBar.noFolderForeground": shade7,
              "statusBar.noFolderBackground": accent6,
              "statusBarItem.activeBackground": accent4,
              "statusBarItem.hoverBackground": accent3,
              "statusBarItem.prominentBackground": accent4,
              "statusBarItem.prominentHoverBackground": accent3,
              "statusBar.border": accent5,

              // Title bar colors
              "titleBar.activeBackground": shade0,
              "titleBar.activeForeground": shade5,
              "titleBar.inactiveBackground": shade0,
              "titleBar.inactiveForeground": shade4,

              // Notification dialog colors
              "notification.background": shade1,
              "notification.foreground": shade7,
              "notification.buttonBackground": accent5,
              "notification.buttonHoverBackground": accent4,
              "notification.buttonForeground": shade7,
              "notification.infoBackground": accent5,
              "notification.infoForeground": shade7,
              "notification.warningBackground": accent1,
              "notification.warningForeground": shade7,
              "notification.errorBackground": accent0,
              "notification.errorForeground": shade7,

              // Extensions
              "extensionButton.prominentForeground": shade7,
              "extensionButton.prominentBackground": accent5,
              "extensionButton.prominentHoverBackground": accent4,

              // Quick picker
              "pickerGroup.border": accent7,
              "pickerGroup.foreground": accent3,

              // Integrated terminal colors
              "terminal.background": shade0,
              "terminal.foreground": shade6,
              "terminal.ansiBlack": shade0,
              "terminal.ansiBlue": accent5,
              "terminal.ansiBrightBlack": shade1,
              "terminal.ansiBrightBlue": accent5,
              "terminal.ansiBrightCyan": accent4,
              "terminal.ansiBrightGreen": accent4,
              "terminal.ansiBrightMagenta": accent7,
              "terminal.ansiBrightRed": accent1,
              "terminal.ansiBrightWhite": shade7,
              "terminal.ansiBrightYellow": accent2,
              "terminal.ansiCyan": accent4,
              "terminal.ansiGreen": accent3,
              "terminal.ansiMagenta": accent7,
              "terminal.ansiRed": accent0,
              "terminal.ansiWhite": shade6,
              "terminal.ansiYellow": accent2,

              // Debug
              "debugToolBar.background": shade1,

              // Welcome page
              "welcomePage.buttonBackground": accent5,
              "welcomePage.buttonHoverBackground": accent4,
              "walkThrough.embeddedEditorBackground": shade0
            },
            tokenColors: [
              {
                settings: {
                  background: shade0,
                  foreground: shade6,
                  selectionBorder: shade5,
                  findHighlight: accent2,
                  findHighlightForeground: shade0,
                  activeGuide: accent1,
                  bracketsForeground: `${shade6}7F`,
                  bracketsOptions: "stippled_underline",
                  bracketsContentsForeground: `${shade6}7F`,
                  tagsOptions: "stippled_underline"
                }
              },
              {
                name: "Comment",
                scope: "comment",
                settings: {
                  foreground: shade2
                }
              },
              {
                name: "Constant",
                scope: "constant",
                settings: {
                  foreground: accent7
                }
              },
              {
                name: "Entity",
                scope: "entity",
                settings: {
                  foreground: accent4
                }
              },
              {
                name: "Invalid",
                scope: "invalid",
                settings: {
                  background: accent0,
                  foreground: shade1
                }
              },
              {
                name: "Keyword",
                scope: "keyword",
                settings: {
                  foreground: accent6
                }
              },
              {
                name: "Storage",
                scope: "storage",
                settings: {
                  foreground: accent7
                }
              },
              {
                name: "String",
                scope: "string",
                settings: {
                  foreground: accent3
                }
              },
              {
                name: "Support",
                scope: "support",
                settings: {
                  foreground: accent4
                }
              },
              {
                name: "Variable",
                scope: "variable",
                settings: {
                  foreground: shade7
                }
              },
              {
                name: "Markup Heading",
                scope: "markup.heading",
                settings: {
                  foreground: accent4
                }
              },
              {
                name: "Markup Deleted",
                scope: "markup.deleted",
                settings: {
                  foreground: accent0
                }
              },
              {
                name: "Markup Inserted",
                scope: "markup.inserted",
                settings: {
                  foreground: accent3
                }
              },
              {
                name: "Markup Changed",
                scope: "markup.changed",
                settings: {
                  foreground: accent2
                }
              },
              {
                name: "Markup Underline",
                scope: "markup.underline",
                settings: {
                  fontStyle: "underline"
                }
              },
              {
                name: "Markup Underline Link",
                scope: "markup.underline.link",
                settings: {
                  foreground: accent5
                }
              },
              {
                name: "Markup List",
                scope: "markup.list",
                settings: {
                  foreground: shade7
                }
              },
              {
                name: "Markup Raw",
                scope: "markup.raw",
                settings: {
                  foreground: accent7
                }
              }
            ]
          },
          null,
          2
        )
      )
    });
  });
