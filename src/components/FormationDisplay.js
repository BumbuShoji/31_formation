import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { playerImages, players } from '../data/players';

const FormationDisplay = ({ formation, playerAssignments }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current);
    svg.selectAll('*').remove();

    const width = 400;
    const height = 800;
    const x_pos = -0;

    svg.attr('width', width).attr('height', height);

    // Add soccer court background image
    svg.append('image')
      .attr('x', -75)
      .attr('y', 0)
      .attr('width', 554)
      .attr('height', 821)
      .attr('xlink:href', 'https://putiya.com/img/sport/soccer01/soccer01_b_09.png');
    
    svg.append('image')
      .attr('x', 5 * width - 40 + x_pos)   // Adjust for double size
      .attr('y', 9 * height - 40)
      .attr('width', 80)  // Double the size
      .attr('height', 80)
      .attr('xlink:href', 'https://www.31ice.co.jp/contents/common_2023/image/top/br31_logo.svg');

    formation.forEach((pos, i) => {
      const player = playerAssignments[`${pos.position}_${i}`];
      const imageUrl = playerImages[players.indexOf(player)];

      svg.append('text')
        .attr('x', (pos.x / 100) * width + x_pos )  // Adjust for double size
        .attr('y', (pos.y / 100) * height + 50)
        .attr('text-anchor', 'middle')
        .style('font-size', '0.7em')  // Increase text size by 0.7
        .text(player);

      svg.append('image')
        .attr('x', (pos.x / 100) * width - 40 + x_pos)   // Adjust for double size
        .attr('y', (pos.y / 100) * height - 40)
        .attr('width', 80)  // Double the size
        .attr('height', 80)
        .attr('xlink:href', imageUrl);
    });
  }, [formation, playerAssignments]);

  return <svg ref={ref}></svg>;
};

export default FormationDisplay;