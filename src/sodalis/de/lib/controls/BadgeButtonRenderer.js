/*!
 * ${copyright}
 */

sap.ui.define([
	"sap/m/ButtonRenderer",
	"sap/ui/core/Renderer",
	"sap/m/Button"
], function (ButtonRenderer, Renderer, mButton) {
	"use strict";

	/**
	 * BadgeButtonRenderer renderer.
	 * @namespace
	 */
	var BadgeButtonRenderer = Renderer.extend(ButtonRenderer);

	/**
	 * Renders the HTML for the given control, using the provided
	 * {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} oRm
	 *            the RenderManager that can be used for writing to
	 *            the Render-Output-Buffer
	 * @param {sap.ui.core.Control} oControl
	 *            the control to be rendered
	 */
	BadgeButtonRenderer.render = function (oRm, oControl) {
		var iCount = oControl.getCount();

		if (iCount) {
			oRm.class("sodalisBadgeBtn");
			oControl.data("badgeCount", iCount.toString(), true);

			oControl.addEventDelegate({
				onAfterRendering: function () {
					var ohtmlButton = oControl.getDomRef(),
						buttonChild;
					for (var i = 0; i < ohtmlButton.childNodes.length; i++) {
						if (ohtmlButton.childNodes[i].className.search("sapMBtnInner") !== -1) {
							buttonChild = ohtmlButton.childNodes[i];
							break;
						}
					}

					/* eslint-disable */
					if (buttonChild) {
						var badgeInner = document.createElement("div");
						badgeInner.classList.add("sodalisBadgeInner");

						var divs = buttonChild.getElementsByTagName("div")
						if (divs.length > 0) {
							buttonChild.removeChild(divs[0]);
						}

						badgeInner.appendChild(document.createTextNode(iCount.toString()));
						buttonChild.appendChild(badgeInner);
					}
					/* eslint-enable */
				}
			});

		}

		ButtonRenderer.render.apply(this, arguments);

	};

	return BadgeButtonRenderer;

}, /* bExport= */ true);