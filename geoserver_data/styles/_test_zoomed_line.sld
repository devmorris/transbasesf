<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.0.0" xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd">
<NamedLayer>
<Name>Zoom-based line</Name>
<UserStyle>
<Title>SLD Cook Book: Zoom-based line</Title>
<FeatureTypeStyle>
<Rule>
<Name>Large</Name>
<MaxScaleDenominator>2133</MaxScaleDenominator>
<LineSymbolizer>
<Stroke>
<CssParameter name="stroke">#009933</CssParameter>
<CssParameter name="stroke-width">6</CssParameter>
</Stroke>
</LineSymbolizer>
</Rule>
<Rule>
<Name>Medium</Name>
<MinScaleDenominator>2133</MinScaleDenominator>
<MaxScaleDenominator>42665</MaxScaleDenominator>
<LineSymbolizer>
<Stroke>
<CssParameter name="stroke">#009933</CssParameter>
<CssParameter name="stroke-width">4</CssParameter>
</Stroke>
</LineSymbolizer>
</Rule>
<Rule>
<Name>Small</Name>
<MinScaleDenominator>8531</MinScaleDenominator>
<LineSymbolizer>
<Stroke>
<CssParameter name="stroke">#009933</CssParameter>
<CssParameter name="stroke-width">2</CssParameter>
</Stroke>
</LineSymbolizer>
</Rule>
</FeatureTypeStyle>
</UserStyle>
</NamedLayer>
</StyledLayerDescriptor>