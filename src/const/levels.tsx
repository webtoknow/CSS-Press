import React from 'react';

import Style from 'style-it';
import { chapter } from '../pages/game-page/GamePage';

export const chapters: chapter[] = [
    {
        chapterName: 'Text',
        levels: [{
            levelName: 'font-family',
            instructions: 'There is a paragraph of this article that seems to be from another story. You can fix it using&nbsp;<code class="instructions__keyword">font-family</code> property.<br/> <br/>Please note that font-family specifies the font and its fallbacks, separated by commas.',
            beforeCode: {},
            selector: 'misprint',
            error: 'font-family: Arial;',
            afterCode: {},
            linesOfCode: 1,
            startHighlightLineNumber: 2,
            articleContent: (selector: string, answer: string, complementaryCSS: string, error: string) => (
                <React.Fragment>
                    <Style>
                        {`${complementaryCSS} .article__body .misprint { ${error}} .article__body .misprint { ${answer}}`}
                    </Style>
                    <h2>Insert your article title here</h2>
                    <div>
                        <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
                        <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus,volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
                        <p>Integer non mollis lorem, ut dignissim augue et la es integer at semper erat mo en placerat purus ac diam elementum, nec feugiat neque faucibus esta nod. Ppurus ac diam elementum, nec feugiat neque faucibus.</p>
                        <p><span className={selector === 'misprint' ? 'misprint highlighted' : 'misprint'}>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span></p>
                        <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
                        <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit elit.</p>
                    </div>
                </React.Fragment>)
        }, {
            levelName: 'font-size',
            instructions: 'Let\'s help the tiny paragraph from there to grow up! <code class="instructions__keyword">Font-size</code> should be the magic potion you need.',
            beforeCode: {
                parent: {
                    position: 'relative'
                }
            },
            selector: 'misprint',
            error: 'font-family: Arial;',
            afterCode: {
                second: {
                    color: 'red'
                },
                first: {
                    position: 'relative',
                    fontFamily: 'Arial'
                }
            },
            linesOfCode: 1,
            startHighlightLineNumber: 5,
            articleContent: (selector: string, answer: string, complementaryCSS: string, error: string) => (
                <React.Fragment>
                    <Style>
                        {`${complementaryCSS} .article__body .misprint { ${error}} .article__body .misprint { ${answer}}`}
                    </Style>
                    <h2>Insert your article title here</h2>
                    <div className={selector === 'parent' ? 'parent highlighted' : 'parent'}>
                        <p className={selector === 'first' ? 'first highlighted' : 'first'}>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
                        <p className={selector === 'second' ? 'second highlighted' : 'second'}>Fusce lobortis ante eget finibus bibendum. Donec mauris purus,volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
                        <p>Integer non mollis lorem, ut dignissim augue et la es integer at semper erat mo en placerat purus ac diam elementum, nec feugiat neque faucibus esta nod. Ppurus ac diam elementum, nec feugiat neque faucibus.</p>
                        <p><span className={selector === 'misprint' ? 'misprint highlighted' : 'misprint'}>Fusce tincidunt risus eget magna pretium placerat. Maecenas et tempus mauris. Aliquam est est, sollicitudin a diam eget, maximus pretium lectu. Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit nostrum assumenda maxime aperiam quos voluptas voluptates minus, labore nesciunt? Lorem, ipsum dolor sit amet consectetur adipisicing elit.</span></p>
                        <p>Fusce lobortis ante eget finibus bibendum. Donec mauris purus, volutpat eget eros in, vestibulum ullamcorper ipsum. Sed pretium metus ac odio pellentesque, sed convallis ante molestie. Praesent sagittis venenatis diam, eu condimentum ipsum hendrerit id. Morbi at massa eu dolor convallis feugiat.</p>
                        <p>Dolor sit amet consectetur adipisicing elit. Nihil id corrupti neque praesentium blanditiis suscipit elit.</p>
                    </div>
                </React.Fragment>)
        }]
    }
]

export const maxNoOfCodeLinesSide = 13;