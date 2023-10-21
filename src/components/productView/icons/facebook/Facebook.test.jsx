import Facebook from './Facebook';
import {render,screen} from '@testing-library/react';

describe('should the SVG icon Facebook in productView', () =>{

    test('should render the SVG icon Facebook in productView', () =>{
        render (<Facebook />)

        const facebook = screen.getByTestId('facebook-svg-test-productView');
        expect(facebook.getAttribute('data-testid')).toBe('facebook-svg-test-productView');
    });
});