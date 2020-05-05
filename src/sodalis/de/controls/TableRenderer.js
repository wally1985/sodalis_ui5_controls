sap.ui.define([
	"sap/m/TableRenderer",
	"./ColumnListItemRenderer",
	"sap/base/security/encodeXML"
], function (ControlRenderer, ColumnListItemRenderer, encodeXML) {
	"use strict";
	return ControlRenderer.extend("sodalis.de.controls.TableRenderer", {

		renderColumns: function (rm, oTable, type) {
			/* eslint-disable */
			var index = 0,
				hiddens = 0,
				hasPopin = false,
				hasFooter = false,
				mode = oTable.getMode(),
				iModeOrder = this.ModeOrder[mode],
				clsPrefix = "sapMListTbl",
				idPrefix = oTable.getId("tbl"),
				cellTag = (type == "Head") ? "th" : "td",
				groupTag = "t" + type.toLowerCase(),
				aColumns = oTable.getColumns(),
				bActiveHeaders = type == "Head" && oTable.bActiveHeaders,
				isHeaderHidden = (type == "Head") && aColumns.every(function (oColumn) {
					return !oColumn.getHeader() ||
						!oColumn.getHeader().getVisible() ||
						!oColumn.getVisible() ||
						oColumn.isPopin() ||
						oColumn.isHidden();
				}),
				hasOneHeader = (type == "Head") && aColumns.filter(oColumn => oColumn.getVisible() && !oColumn.isPopin() && !oColumn.isHidden()).length == 1,
				createBlankCell = function (cls, id, bAriaHidden) {
					rm.write("<");
					rm.write(cellTag);
					if (cellTag === "th") {
						rm.addClass("sapMTableTH");
					}
					bAriaHidden && rm.writeAttribute("aria-hidden", "true");
					id && rm.writeAttribute("id", idPrefix + id);
					rm.addClass(clsPrefix + cls);
					rm.writeClasses();
					rm.write("></");
					rm.write(cellTag);
					rm.write(">");
					index++;
				};
			/* eslint-enable */

			rm.write("<" + groupTag + ">");
			rm.write("<tr");

			rm.writeAttribute("tabindex", -1);
			rm.writeAttribute("id", oTable.addNavSection(idPrefix + type + "er"));

			if (isHeaderHidden) {
				rm.addClass("sapMListTblHeaderNone");
			} else {
				rm.addClass("sapMListTblRow sapMLIBFocusable sapMListTbl" + type + "er");
				ColumnListItemRenderer.addLegacyOutlineClass.call(ColumnListItemRenderer, rm);
			}

			rm.writeClasses();
			rm.write(">");

			createBlankCell("HighlightCol", type + "Highlight", !oTable._iItemNeedsHighlight);

			if (iModeOrder == -1) {
				if (mode == "MultiSelect" && type == "Head" && !isHeaderHidden) {
					rm.write("<th");
					rm.addClass("sapMTableTH");
					rm.writeAttribute("aria-hidden", "true");
					rm.addClass(clsPrefix + "SelCol");
					rm.writeClasses();
					rm.write(">");
					rm.renderControl(oTable._getSelectAllCheckbox());
					rm.write("</th>");
					index++;
				} else {
					createBlankCell("SelCol", "", true);
				}
			}

			aColumns.forEach(function (oColumn, order) {
				oColumn.setIndex(-1);
				oColumn.setInitialOrder(order);
			});

			oTable.getColumns(true).forEach(function (oColumn, order) {
				if (!oColumn.getVisible()) {
					return;
				}
				if (oColumn.isPopin()) {
					hasPopin = true;
					return;
				}
				if (oColumn.isHidden()) {
					hiddens++;
				}

				var control = oColumn["get" + type + "er"](),
					width = hasOneHeader ? "" : oColumn.getWidth(),
					cls = oColumn.getStyleClass(true),
					align = oColumn.getCssAlign();

				rm.write("<" + cellTag);
				cls && rm.addClass(encodeXML(cls));

				if (type == "Head") {
					rm.writeElementData(oColumn);
					rm.addClass("sapMTableTH");
					// adding ColumnHeader specific class in order to overwrite the padding of the cell
					if (bActiveHeaders || (control && control.isA("sap.m.ColumnHeader"))) {
						rm.addClass(clsPrefix + "CellCH");
					}
				}

				rm.addClass(clsPrefix + "Cell");
				rm.addClass(clsPrefix + type + "erCell");
				rm.writeAttribute("data-sap-width", oColumn.getWidth());
				width && rm.addStyle("width", width);

				if (align) {
					rm.addStyle("text-align", align);
				}

				rm.writeClasses();
				rm.writeStyles();
				rm.write(">");

				if (control) {
					if (bActiveHeaders) {
						rm.write("<div tabindex='0' role='button' aria-haspopup='dialog' class='sapMColumnHeader sapMColumnHeaderActive'>");
						control.addStyleClass("sapMColumnHeaderContent");
					}

					rm.renderControl(control);

					if (bActiveHeaders) {
						rm.write("</div>");
					}
				}

				if (type == "Head" && !hasFooter) {
					hasFooter = !!oColumn.getFooter();
				}

				rm.write("</" + cellTag + ">");
				oColumn.setIndex(index++);
			});

			createBlankCell("NavCol", type + "Nav", !oTable._iItemNeedsColumn);

			if (iModeOrder === 1 || oTable.getDeleteActive()) {
				createBlankCell("SelCol", "", true);
			}

			rm.write("</tr></" + groupTag + ">");

			if (type == "Head") {
				oTable._hasPopin = hasPopin;
				oTable._colCount = index - hiddens;
				oTable._hasFooter = hasFooter;
				oTable._headerHidden = isHeaderHidden;
			}
		}

	});
});