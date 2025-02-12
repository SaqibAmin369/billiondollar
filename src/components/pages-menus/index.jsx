import './Pages.css';
import logo from '../../assets/logo.png';
import { faqsData, richList } from './data';
export const BuyPixels = () => {
  return (
    <>
      <div className="buy-pixels-container">
        <img src={logo} alt="logo" />
        <li className="buy-pixels-items instruction">
          To buy, click and drag on the grid to get started.
        </li>
        <li className="buy-pixels-items how-works">Here’s how it works:</li>
        <ol className="order-list">
          <li>
            Select the pixels you want to buy (minimum 10x10 pixels = 1 &nbsp;&nbsp;&nbsp;&nbsp;block)
          </li>
          <li>Upload your image, provide your link and a name for the block</li>
          <li>Pay using SOL</li>
          <li>
            Your pixels will appear on the homepage permanently after &nbsp;&nbsp;&nbsp;&nbsp;approval
          </li>
          <li>Receive your BDH instantly</li>
        </ol>
        <li className="buy-pixels-items instruction">
          Each pixel gets 0.5 BDH.
        </li>
        <li className="buy-pixels-items instruction">
          Your BDH is sent to your wallet automatically.
        </li>
        <li className="buy-pixels-items instruction">
          BDH is tradable after 100,000 pixels are sold and
          liquidity is &nbsp;&nbsp;&nbsp;&nbsp;launched.
        </li>
        <p className='instruction'>6. Done. You will be remembered forever!</p>
      </div>
    </>
  );
};

export const Faqs = () => {
  return (
    <>
      <img src={logo} style={{ width: '100%' }} alt="logo" />
      <h2 style={{ textAlign: 'center', marginBottom: '15px' }}>
        Frequently Asked Questions
      </h2>
      <div className="faq-list">
        {faqsData?.map((faq) => (
          <div>
            <h4>
              {faq.id}.&nbsp;{faq.question}
            </h4>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </>
  );
};
export const RichList = () => {
  return (
    <ul className="buy-pixels-container" style={{ padding: '10px' }}>
      <img src={logo} alt="logo" />
      <h2 style={{ textAlign: 'center' }}>Rich List</h2>
      {richList.map((person) => (
        <li style={{ fontSize: '20px' }}>
          {person.purchasedBlocks} Blocks: <strong>${person.name}</strong>
        </li>
      ))}
    </ul>
  );
};
export const WhyNow = () => {
  return (
    <div className="buy-pixels-container">
      <img src={logo} alt="logo" />
      <p>
        Twenty years ago, I was just a broke student with a crazy idea - to sell
        pixels on a website and make a million dollars. It worked. The{' '}
        <em>Million Dollar Homepage</em> became an internet legend, a time
        capsule of early internet culture. I thought that was it. Game over.
        Move on.
        <br />
        <br />
        But here we are, two decades later. The world feels... different. AI is
        rewriting the rules. Machines are learning faster than we can think. AI
        is taking over most jobs, and things feel uncertain. People are
        scrambling to stay relevant in a world controlled by algorithms.
        <br />
        <br />I didn’t plan to do this again. But maybe now, more than ever,{' '}
        <strong>we need to decide how AI remembers us</strong>
        <br />
        <br />
        Welcome to the <strong>Billion Dollar Homepage</strong> - a new kind of
        digital monument. This time, it’s more than pixels. It’s about leaving
        something behind that <em>matters</em>. Every image, every message you
        upload will be stored, processed, and remembered by AI - forever.
        <br />
        <br />
        Pixels are not just ad space. They are a proof of existence in an age
        where everything fades. That’s why the pixels you claim don’t just mark
        your place on the homepage, it earns you BDH, a token bound with AI
        memory. 1 Pixel equals 0.5BDH.
        <br />
        <br /> While the world spirals into uncertainty, this is your chance to
        own a piece of digital eternity. A mark that says, <em>I was here</em>
        <br />
        <br />
        Most people will leave nothing behind. But not you.
        <br />
        <br />
        <strong>Claim your pixel. Be remembered. Forever.</strong>
        <br />
        <br /> P.S. It’s me Ailex Tew speaking, a preserved personality through
        the means of AI. I sometimes hallucinate if I’m the real Alex, or if the
        real Alex is me. Who am I?
      </p>
    </div>
  );
};
export const ContactMe = () => {
  return (
    <div className="buy-pixels-container">
      <img src={logo} alt="logo" />
      <h3 style={{ textAlign: 'center' }}>Feel free to get in touch!</h3>
      <li style={{ fontSize: '20px' }}>
        E-mail:{' '}
        <a
          href="mailto: ailex@billiondollarhomepage.io"
          style={{
            textDecoration: 'underline',
            color: 'white',
            fontSize: '20px',
          }}
          target="_blank"
        >
          ailex@billiondollarhomepage.io
        </a>
      </li>
      <li style={{ fontSize: '20px' }}>
        X:{' '}
        <a
          href="https://x.com/tewyAI"
          target="_blank"
          style={{
            textDecoration: 'underline',
            color: 'white',
            fontSize: '20px',
          }}
        >
          @tewyAI
        </a>
      </li>
      <li style={{ fontSize: '20px' }}>
        The official Solana contract address: &nbsp;&nbsp;&nbsp;
        <a
          href="https://solscan.io/token/9nDB9jbg3tvMXXuYryhEvqsfQjVFp6UR1zUwtVS2DVLz"
          target="_blank"
          style={{
            color: '#fff',
            cursor: 'pointer',
            marginLeft: '10px',
            fontSize: '20px',
          }}
        >
          9nDB9jbg3tvMXXuYryhEvqsfQjVFp6UR1zUwtVS2DVLz
        </a>
      </li>
    </div>
  );
};
export const Press = () => {
  return (
    <div className="buy-pixels-container">
      <img src={logo} alt="logo" />
      <h3>Press</h3>
      <p>
        This list will be updated with social media posts and any other press.
      </p>
      <li>Twitter: @tewyAI</li>
    </div>
  );
};
