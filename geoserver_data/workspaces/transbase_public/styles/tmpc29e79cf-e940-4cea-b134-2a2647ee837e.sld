<?xml version="1.0" encoding="UTF-8"?>
<StyledLayerDescriptor xmlns="http://www.opengis.net/sld" xmlns:ogc="http://www.opengis.net/ogc" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" version="1.1.0" xmlns:xlink="http://www.w3.org/1999/xlink" xsi:schemaLocation="http://www.opengis.net/sld http://schemas.opengis.net/sld/1.1.0/StyledLayerDescriptor.xsd" xmlns:se="http://www.opengis.net/se">
  <NamedLayer>
    <se:Name>vw_geo_intrsctn_sp_vz_fatality_tracking</se:Name>
    <UserStyle>
      <se:Name>vw_geo_intrsctn_sp_vz_fatality_tracking</se:Name>
      <se:FeatureTypeStyle>
        <se:Rule>
          <se:Name>Driver</se:Name>
          <se:Description>
            <se:Title>Driver</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>deceased</ogc:PropertyName>
              <ogc:Literal>Driver</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource xlink:type="simple" xlink:href="C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps/transbase/resources/images/icons/human51.svg"/>
                <se:Format>image/svg+xml</se:Format>
              </se:ExternalGraphic>
              <se:Size>6</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>Passenger</se:Name>
          <se:Description>
            <se:Title>Passenger</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>deceased</ogc:PropertyName>
              <ogc:Literal>Passenger</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource xlink:type="simple" xlink:href="C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps/transbase/resources/images/icons/human51.svg"/>
                <se:Format>image/svg+xml</se:Format>
              </se:ExternalGraphic>
              <se:Size>6</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>Motorcyclist</se:Name>
          <se:Description>
            <se:Title>Motorcyclist</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>deceased</ogc:PropertyName>
              <ogc:Literal>Motorcyclist</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource xlink:type="simple" xlink:href="C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps/transbase/resources/images/icons/human51.svg"/>
                <se:Format>image/svg+xml</se:Format>
              </se:ExternalGraphic>
              <se:Size>6</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>Cyclist</se:Name>
          <se:Description>
            <se:Title>Cyclist</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>deceased</ogc:PropertyName>
              <ogc:Literal>Cyclist</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource xlink:type="simple" xlink:href="C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps/transbase/resources/images/icons/human51.svg"/>
                <se:Format>image/svg+xml</se:Format>
              </se:ExternalGraphic>
              <se:Size>6</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>Pedestrian</se:Name>
          <se:Description>
            <se:Title>Pedestrian</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>deceased</ogc:PropertyName>
              <ogc:Literal>Pedestrian</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource xlink:type="simple" xlink:href="C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps/transbase/resources/images/icons/human51.svg"/>
                <se:Format>image/svg+xml</se:Format>
              </se:ExternalGraphic>
              <se:Size>6</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
        <se:Rule>
          <se:Name>Motorized wheelchair</se:Name>
          <se:Description>
            <se:Title>Motorized wheelchair</se:Title>
          </se:Description>
          <ogc:Filter xmlns:ogc="http://www.opengis.net/ogc">
            <ogc:PropertyIsEqualTo>
              <ogc:PropertyName>deceased</ogc:PropertyName>
              <ogc:Literal>Motorized wheelchair</ogc:Literal>
            </ogc:PropertyIsEqualTo>
          </ogc:Filter>
          <se:PointSymbolizer>
            <se:Graphic>
              <se:ExternalGraphic>
                <se:OnlineResource xlink:type="simple" xlink:href="C:/Program Files/Apache Software Foundation/Tomcat 7.0/webapps/transbase/resources/images/icons/human51.svg"/>
                <se:Format>image/svg+xml</se:Format>
              </se:ExternalGraphic>
              <se:Size>6</se:Size>
            </se:Graphic>
          </se:PointSymbolizer>
        </se:Rule>
      </se:FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>