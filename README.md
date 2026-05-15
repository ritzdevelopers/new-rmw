<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ritz Media World | Digital Hub</title>
    <style>
        :root {
            --primary: #d4145a;
            --secondary: #fbb03b;
            --dark: #1a1a1a;
            --light: #ffffff;
        }

        body {
            margin: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #1a1a1a 0%, #333333 100%);
            color: var(--light);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
        }

        .container {
            width: 90%;
            max-width: 1000px;
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 24px;
            padding: 40px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.5);
            animation: fadeIn 1s ease-out;
        }

        header {
            text-align: center;
            margin-bottom: 40px;
        }

        h1 {
            font-size: 2.5rem;
            margin: 0;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            text-transform: uppercase;
            letter-spacing: 2px;
        }

        .tagline {
            color: #aaa;
            font-style: italic;
            margin-top: 10px;
        }

        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }

        .card {
            background: rgba(255, 255, 255, 0.03);
            padding: 25px;
            border-radius: 16px;
            transition: transform 0.3s ease, background 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .card:hover {
            transform: translateY(-10px);
            background: rgba(255, 255, 255, 0.08);
            border-color: var(--primary);
        }

        .card h3 {
            color: var(--secondary);
            margin-top: 0;
        }

        .btn {
            display: inline-block;
            margin-top: 30px;
            padding: 12px 30px;
            background: linear-gradient(to right, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: bold;
            transition: opacity 0.3s;
        }

        .btn:hover {
            opacity: 0.9;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }

        footer {
            margin-top: 40px;
            text-align: center;
            font-size: 0.8rem;
            color: #666;
        }
    </style>
</head>
<body>

<div class="container">
    <header>
        <h1>Ritz Media World</h1>
        <p class="tagline">Award Winning 360° Marketing Agency</p>
    </header>

    <div class="grid">
        <div class="card">
            <h3>Digital Growth</h3>
            <p>Expert SEO, PPC, and Performance Marketing to dominate search results and ROI.</p>
        </div>
        <div class="card">
            <h3>Creative Identity</h3>
            <p>From Logo Design to Video Production, we craft stories that build legendary brands.</p>
        </div>
        <div class="card">
            <h3>Classic Media</h3>
            <p>Premium placements in Print, Radio, and Outdoor advertising across India.</p>
        </div>
    </div>

    <center>
        <a href="https://ritzmediaworld.com" class="btn">Explore Official Website</a>
    </center>

    <footer>
        &copy; 2026 Ritz Media World | Established 2008
    </footer>
</div>

</body>
</html>
