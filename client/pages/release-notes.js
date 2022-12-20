import useSWR from 'swr';
import Link from 'next/link';

import LoaderComponent from '../components/Loader.component';

function ChangeLogPage() {
    const fetcher = url => fetch(url, {
        headers: {
            'Authorization': 'Basic ' + btoa(process.env.githubUsername + ':' + process.env.githubToken),
        }
    }).then(r => r.json()).then(r => r);
    const {
        data,
        error
    } = useSWR('https://api.github.com/repos/' + process.env.githubUsername + '/tooly/commits', fetcher);

    if (error) return window.location.href = '/';
    if (!data) return <LoaderComponent color="#5865F2"/>;

    console.log(data[0])
    console.log(data[7])

    return (
        <div>
            <h1 className="font-bold text-2xl flex items-center justify-center mt-10">Release Notes</h1>

            <div className="flex justify-center items-center mt-7">
                <ul className="max-w-lg max-md:max-w-md max-sm:max-w-sm">
                    {data.slice(0, 10).map((_, index) => (
                        <li key={index} className="py-3">
                            <div className={`${index === 0 ? 'bg-red-500 bg-opacity-50' : 'bg-[#1f2024]'} rounded p-3 flex items-center space-x-4`}>
                                <div className="flex-shrink-0">
                                    <img className="h-10 w-10 rounded-full" src={_.author.avatar_url} alt="pp"/>
                                </div>
                                <div className="min-w-0 flex-1">
                                    <p className="text-sm underline font-medium truncate"><a href={_.html_url}>{_.commit.message}</a></p>
                                    <p className="text-sm truncate">{_.commit.author.name}</p>
                                </div>
                                <div>
                                    <p className="text-sm truncate">{new Date(_.commit.author.date).toLocaleTimeString('en-US', {hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true})}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            <Link href="/" className="font-bold bg-[#093a5b] mx-auto w-[150px] mb-5 mt-3 p-3 rounded flex items-center justify-center">Go Back</Link>
        </div>
    );
}

export default ChangeLogPage;
