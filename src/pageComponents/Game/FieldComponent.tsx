import React from 'react';
import grass from '../../assets/Tiles/grass.webp';
import grass2 from '../../assets/Tiles/grass-2.webp';
import path from '../../assets/Tiles/path.webp';
import floor from '../../assets/Tiles/floor.webp';
import topLeftCorner from '../../assets/Tiles/grass-corner-top-left.webp';
import topRightCorner from '../../assets/Tiles/grass-corner-top-right.webp';
import bottomLeftCorner from '../../assets/Tiles/grass-corner-bottom-left.webp';
import bottomRightCorner from '../../assets/Tiles/grass-corner-bottom-right.webp';
import bottomWall from '../../assets/Tiles/grass-wall-bottom.webp';
import topWall from '../../assets/Tiles/grass-wall-top.webp';
import leftWall from '../../assets/Tiles/grass-wall-left.webp';
import rightWall from '../../assets/Tiles/grass-wall-right.webp';
import trap from '../../assets/Tiles/grass-trap.webp';
import wall from '../../assets/Tiles/grass-wall.webp';
import water from '../../assets/Tiles/water.webp';
import waterBottom from '../../assets/Tiles/water-bottom.webp';
import waterTop from '../../assets/Tiles/water-top.webp';
import waterLeft from '../../assets/Tiles/water-left.webp';
import waterRight from '../../assets/Tiles/water-right.webp';
import waterCornerBottomLeft from '../../assets/Tiles/water-corner-bottom-left.webp';
import waterCornerBottomRight from '../../assets/Tiles/water-corner-bottom-right.webp';
import waterCornerTopLeft from '../../assets/Tiles/water-corner-top-left.webp';
import waterCornerTopRight from '../../assets/Tiles/water-corner-top-right.webp';
import waterCornerLinkBottomLeft from '../../assets/Tiles/water-corner-link-bottom-left.webp';
import waterCornerLinkBottomRight from '../../assets/Tiles/water-corner-link-bottom-right.webp';
import waterCornerLinkTopLeft from '../../assets/Tiles/water-corner-link-top-left.webp';
import waterCornerLinkTopRight from '../../assets/Tiles/water-corner-link-top-right.webp';
import waterLinkBottomLeft from '../../assets/Tiles/water-link-bottom-left.webp';
import waterLinkBottomRight from '../../assets/Tiles/water-link-bottom-right.webp';
import waterLinkTopLeft from '../../assets/Tiles/water-link-top-left.webp';
import waterLinkTopRight from '../../assets/Tiles/water-link-top-right.webp';
import waterHorizontal from '../../assets/Tiles/water-horizontal.webp';
import waterVertical from '../../assets/Tiles/water-vertical.webp';
import waterAll from '../../assets/Tiles/water-all.webp';
import waterBottomLinkLeft from '../../assets/Tiles/water-bottom-link-left.webp';
import waterBottomLinkRight from '../../assets/Tiles/water-bottom-link-right.webp';
import waterBottomLinks from '../../assets/Tiles/water-bottom-links.webp';
import waterLeftLinkBottom from '../../assets/Tiles/water-left-link-bottom.webp';
import waterLeftLinks from '../../assets/Tiles/water-left-links.webp';
import waterLeftLinkTop from '../../assets/Tiles/water-left-link-top.webp';
import waterLinkCornerBottomLeft from '../../assets/Tiles/water-link-corner-bottom-left.webp';
import waterLinkCornerBottomRight from '../../assets/Tiles/water-link-corner-bottom-right.webp';
import waterLinkCornerTopLeft from '../../assets/Tiles/water-link-corner-top-left.webp';
import waterLinkCornerTopRight from '../../assets/Tiles/water-link-corner-top-right.webp';
import waterLinksAll from '../../assets/Tiles/water-links-all.webp';
import waterLinksBottom from '../../assets/Tiles/water-links-bottom.webp';
import waterLinksDiagonalDown from '../../assets/Tiles/water-links-diagonal-down.webp';
import waterLinksDiagonalUp from '../../assets/Tiles/water-links-diagonal-up.webp';
import waterLinksLeft from '../../assets/Tiles/water-links-left.webp';
import waterLinksRight from '../../assets/Tiles/water-links-right.webp';
import waterLinksTop from '../../assets/Tiles/water-links-top.webp';
import waterRightLinkBottom from '../../assets/Tiles/water-right-link-bottom.webp';
import waterRightLinks from '../../assets/Tiles/water-right-links.webp';
import waterRightLinkTop from '../../assets/Tiles/water-right-link-top.webp';
import waterTopLinkLeft from '../../assets/Tiles/water-top-link-left.webp';
import waterTopLinkRight from '../../assets/Tiles/water-top-link-right.webp';
import waterTopLinks from '../../assets/Tiles/water-top-links.webp';
import waterTopEnd from '../../assets/Tiles/water-top-end.webp';
import waterLeftEnd from '../../assets/Tiles/water-left-end.webp';
import waterRightEnd from '../../assets/Tiles/water-right-end.webp';
import waterBottomEnd from '../../assets/Tiles/water-bottom-end.webp';
import bush from '../../assets/Tiles/grass-bush.webp';
import tree from '../../assets/Tiles/grass-tree.webp';
import { Field } from '../../types/DBTypes';

interface FieldProps {
  field: Field | undefined;
  isCharacterPosition: boolean;
  additionalClasses: string;
}

const FieldComponent: React.FC<FieldProps> = React.memo(
  ({ field, isCharacterPosition, additionalClasses }) => {
    const getImageUrl = (type: string | undefined): string => {
      switch (type) {
        case 'path':
          return path;
        case 'grass':
          return grass;
        case 'grass-2':
          return grass2;
        case 'floor':
          return floor;
        case 'top-left-corner':
          return topLeftCorner;
        case 'top-right-corner':
          return topRightCorner;
        case 'bottom-left-corner':
          return bottomLeftCorner;
        case 'bottom-right-corner':
          return bottomRightCorner;
        case 'bottom-wall':
          return bottomWall;
        case 'top-wall':
          return topWall;
        case 'left-wall':
          return leftWall;
        case 'right-wall':
          return rightWall;
        case 'trap':
          return trap;
        case 'wall':
          return wall;
        case 'water':
          return water;
        case 'water-bottom':
          return waterBottom;
        case 'water-top':
          return waterTop;
        case 'water-left':
          return waterLeft;
        case 'water-right':
          return waterRight;
        case 'water-corner-bottom-left':
          return waterCornerBottomLeft;
        case 'water-corner-bottom-right':
          return waterCornerBottomRight;
        case 'water-corner-top-left':
          return waterCornerTopLeft;
        case 'water-corner-top-right':
          return waterCornerTopRight;
        case 'water-corner-link-bottom-left':
          return waterCornerLinkBottomLeft;
        case 'water-corner-link-bottom-right':
          return waterCornerLinkBottomRight;
        case 'water-corner-link-top-left':
          return waterCornerLinkTopLeft;
        case 'water-corner-link-top-right':
          return waterCornerLinkTopRight;
        case 'water-link-bottom-left':
          return waterLinkBottomLeft;
        case 'water-link-bottom-right':
          return waterLinkBottomRight;
        case 'water-link-top-left':
          return waterLinkTopLeft;
        case 'water-link-top-right':
          return waterLinkTopRight;
        case 'water-horizontal':
          return waterHorizontal;
        case 'water-vertical':
          return waterVertical;
        case 'water-all':
          return waterAll;
        case 'water-top-end':
          return waterTopEnd;
        case 'water-left-end':
          return waterLeftEnd;
        case 'water-right-end':
          return waterRightEnd;
        case 'water-bottom-end':
          return waterBottomEnd;
        case 'water-bottom-link-left':
          return waterBottomLinkLeft;
        case 'water-bottom-link-right':
          return waterBottomLinkRight;
        case 'water-bottom-links':
          return waterBottomLinks;
        case 'water-left-link-bottom':
          return waterLeftLinkBottom;
        case 'water-left-links':
          return waterLeftLinks;
        case 'water-left-link-top':
          return waterLeftLinkTop;
        case 'water-link-corner-bottom-left':
          return waterLinkCornerBottomLeft;
        case 'water-link-corner-bottom-right':
          return waterLinkCornerBottomRight;
        case 'water-link-corner-top-left':
          return waterLinkCornerTopLeft;
        case 'water-link-corner-top-right':
          return waterLinkCornerTopRight;
        case 'water-links-all':
          return waterLinksAll;
        case 'water-links-bottom':
          return waterLinksBottom;
        case 'water-links-diagonal-down':
          return waterLinksDiagonalDown;
        case 'water-links-diagonal-up':
          return waterLinksDiagonalUp;
        case 'water-links-left':
          return waterLinksLeft;
        case 'water-links-right':
          return waterLinksRight;
        case 'water-links-top':
          return waterLinksTop;
        case 'water-right-link-bottom':
          return waterRightLinkBottom;
        case 'water-right-links':
          return waterRightLinks;
        case 'water-right-link-top':
          return waterRightLinkTop;
        case 'water-top-link-left':
          return waterTopLinkLeft;
        case 'water-top-link-right':
          return waterTopLinkRight;
        case 'water-top-links':
          return waterTopLinks;
        case 'bush':
          return bush;
        case 'tree':
          return tree;
        default:
          return '';
      }
    };

    return (
      <div
        className={`flex justify-center items-center ${
          isCharacterPosition ? 'border-4 border-yellow-500' : ''
        } ${additionalClasses}`}
        style={{
          width: '64px',
          height: '64px',
          position: 'relative',
          cursor: 'pointer',
          backgroundColor: getImageUrl(field?.type) ? '' : 'gray',
          backgroundImage: `url(${getImageUrl(field?.type)})`,
          backgroundSize: 'cover'
        }}
      >
        {/* Optional destructible and impassable indicators */}
        {/* {field && field.isDestructible && (
          <span
            className="absolute bottom-1 right-1 text-xs text-red-500 font-bold"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            D
          </span>
        )}
        {field && !field.passable && (
          <span
            className="absolute top-1 left-1 text-xs text-red-500 font-bold"
            style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
          >
            X
          </span>
        )} */}
      </div>
    );
  }
);

export default FieldComponent;
