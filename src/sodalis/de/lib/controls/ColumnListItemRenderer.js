sap.ui.define([
	"sap/m/ColumnListItemRenderer",
	"sap/ui/core/Renderer",
	"sap/m/ListType",
	"sap/ui/core/IconPool"
], function (ControlRenderer, Renderer, ListType, IconPool) {
	"use strict";

	/*
	 * ColumnLisItemRenderer renderer.
	 * @namespace
	 */
	var ColumnLisItemRenderer = Renderer.extend(ControlRenderer);

	/*
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm
	 *            the RenderManager that can be used for writing to
	 *            the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oControl
	 *            the control to be rendered
	 */
	ColumnLisItemRenderer.renderModeContent = function (rm, oLI, oModeControl) {
		oModeControl.setVisible(oLI.getSelectable());
		ControlRenderer.renderModeContent.apply(this, arguments);
	};

	/*
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm
	 *            the RenderManager that can be used for writing to
	 *            the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oControl
	 *            the control to be rendered
	 */
	ColumnLisItemRenderer.renderContentLatter = function (rm, oLI) {
		var sMode = oLI.getMode();

		this.renderCounter(rm, oLI);

		if (oLI.getType() === ListType.Detail || oLI.getType() === ListType.DetailAndActive) {
			if (oLI.getEditable()) {
				oLI.DetailIconURI = IconPool.getIconURI("edit");
			} else {
				oLI.DetailIconURI = IconPool.getIconURI("display");
			}

			if (oLI._oDetailControl) {
				oLI._oDetailControl.destroy();
				oLI._oDetailControl = undefined;
			}
		}

		this.renderType(rm, oLI);
		this.renderMode(rm, oLI, 1);

		if (this.isModeMatched(sMode, 1)) {
			// no dublicate renderings
			return;
		}

		if (oLI.getDeleteable() && oLI.getListProperty("deleteActive")) {
			let oModeControl = oLI.getDeleteControl(true);
			if (oModeControl) {
				this.renderModeContent(rm, oLI, oModeControl);
			}
		} else {
			/* eslint-disable */
			rm.write('<td class="sapMListTblNavCol" aria-hidden="true">');
			rm.write('</td>');
			/* eslint-enable */
		}
	};

	return ColumnLisItemRenderer;
});