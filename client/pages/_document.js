import Document, {Html, Head, Main, NextScript} from 'next/document'

class MyDocument extends Document {

    render(){
        return (
            <Html lang="en">
                <Head>
                    <meta charSet="UTF-8"/>
                    {/* <meta name="viewport" content="width=device-width, initial-scale=1.0" /> */}
                    <link href="https://fonts.googleapis.com/css2?family=Architects+Daughter&display=swap" rel="stylesheet"/> 
                    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@300;900&display=swap" rel="stylesheet"/>
                    <link rel="stylesheet" href="https://allyoucan.cloud/cdn/icofont/1.0.1/icofont.css" integrity="sha384-jbCTJB16Q17718YM9U22iJkhuGbS0Gd2LjaWb4YJEZToOPmnKDjySVa323U+W7Fv" crossOrigin="anonymous"/>
                </Head> 

                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument