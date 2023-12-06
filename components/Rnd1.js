import {Rnd} from 'react-rnd';
import Test4 from './Test4';

function Box() {
    return (
        <div
            className="box border rounded-lg"
            style={{ margin: 0, height: '100%', paddingBottom: '40px' }}
        >
            <Test4/>
        </div>
    );
};

export default function Rnd1() {
    return (
    
        <div
            style={{
                width: '800px',
                height: '400px',
            }}
        >
            <Rnd
                default={{
                    x: 150,
                    y: 205,
                    width: 500,
                    height: 190,
                }}
                minWidth={500}
                minHeight={190}
                bounds="window"
            >
                <Box/>
            </Rnd>
        </div>
    
    );
};