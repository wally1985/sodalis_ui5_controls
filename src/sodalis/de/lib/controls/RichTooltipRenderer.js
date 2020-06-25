/*!
 * ${copyright}
 */

// Provides default renderer for control sap.ui.commons.RichTooltip
sap.ui.define([
	"sap/ui/core/ValueStateSupport",
	"sap/ui/core/library"
], function (ValueStateSupport, coreLibrary) {
	"use strict";

	// shortcut for sap.ui.core.ValueState
	var ValueState = coreLibrary.ValueState;

	/**
	 * RichToltip renderer.
	 * @namespace
	 */
	var RichTooltipRenderer = {};

	/**
	 * Renders the HTML for the RichTooltip, using the provided {@link sap.ui.core.RenderManager}.
	 *
	 * @param {sap.ui.core.RenderManager} rm The RenderManager that can be used for writing to the render output buffer.
	 * @param {sap.ui.core.Control} oRichTooltip An object representation of the control that should be rendered.
	 */
	RichTooltipRenderer.render = function (rm, oRichTooltip) {
		var sId = oRichTooltip.getId();

		// Header
		rm.write("<div ");
		rm.writeControlData(oRichTooltip);
		rm.addClass("sodalisRtt");
		rm.writeClasses();
		rm.write(" ><div><div>");
		rm.write("<div class='sodalisRttTopL'></div><div class='sodalisRttTopR'></div>");
		rm.write("<div class='sodalisRttCL'>");
		rm.write("<div class='sodalisRttCR'>");

		rm.write("<div class='sodalisRttContent'>");

		// Title
		var sTitle = oRichTooltip.getTitle();
		if (sTitle) {
			rm.write("<div id='" + sId + "-title' role='tooltip' class='sodalisRttTitle'>");
			rm.writeEscaped(sTitle);
			rm.write("</div>");
			// render a separator between title and rest of the RichTooltip
			rm.write("<div class='sodalisRttSep'></div>");
		}

		// if the parent element has a set ValueState render the corresponding text and image
		var sValueStateText = ValueStateSupport.getAdditionalText(oRichTooltip.getParent());

		// render the individual ValueState text (if available) otherwise use the default text
		var sIndividualText = oRichTooltip.getAggregation("individualStateText");

		// if there is any (from parent control or from RTT itself) value state text set
		if (sValueStateText || sIndividualText) {
			rm.write('<div class="sodalisRttValueStateContainer">');

			// only if the owner of the RTT has a value state - render state and image
			if (sValueStateText) {
				var sValueState = oRichTooltip.getParent().getValueState();
				var sValueStateImage = sValueState !== ValueState.None ? "ValueState_" + sValueState + ".png" : "";

				// if there is a proper value state -> render corresponding image
				if (sValueStateImage !== "") {
					sValueStateImage = sap.ui.require.toUrl("sap/ui/commons/themes/" + sap.ui.getCore().getConfiguration().getTheme() +
						"/img/richtooltip/" + sValueStateImage);
					rm.write('<img id="' + sId + '-valueStateImage" class="sodalisRttValueStateImage" src="');
					rm.writeEscaped(sValueStateImage);
					rm.write('"/>');
				}
			}

			if (sIndividualText) {
				rm.renderControl(sIndividualText);
			} else {
				rm.write('<div id="' + sId + '-valueStateText" class="sodalisRttValueStateText">');
				rm.writeEscaped(sValueStateText);
				rm.write('</div>');
			}

			rm.write('</div>');

			// render a separator between ValueState stuff and text of the RichTooltip
			rm.write("<div class='sodalisRttSep'></div>");
		}

		rm.write('<div class="sodalisRttContentContainer">');
		// render image that might be set
		var sImage = oRichTooltip.getImageSrc();
		if (sImage) {
			var sAltText = oRichTooltip.getImageAltText();
			rm.write('<img id="' + sId + '-image" class="sodalisRttImage"');
			rm.writeAttributeEscaped('alt', sAltText);
			rm.writeAttributeEscaped('src', sImage);
			rm.write('"/>');
		}

		// render RichTooltip's text
		var oText = oRichTooltip.getAggregation("formattedText");
		if (oText) {
			rm.renderControl(oText);
		}
		rm.write('</div>');

		// render footer
		rm.write("</div></div></div>");
		rm.write("<div class='sodalisRttBotL'></div>");
		rm.write("<div class='sodalisRttBotR'></div>");
		rm.write("</div></div></div>");
	};

	return RichTooltipRenderer;

}, /* bExport= */ true);