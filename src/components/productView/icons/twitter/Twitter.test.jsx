import Twitter from './Twitter';
import {render,screen} from '@testing-library/react';

describe('should the SVG icon Twitter in productView', () =>{

    test('should render the SVG icon Twitter in productView', () =>{
        render (<Twitter />)

        const twitter = screen.getByTestId('twitter-svg-test-productView');
        expect(twitter.getAttribute('data-testid')).toBe('twitter-svg-test-productView');
    });
});