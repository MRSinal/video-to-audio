'use client'
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { fetchFile, toBlobURL } from '@ffmpeg/util'
import { useRef, useState } from 'react'
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"
export default function Convert() {
    const [loaded, setLoaded] = useState(false);
    const ffmpegRef = useRef(new FFmpeg());
    const videoRef = useRef(null);
    const messageRef = useRef(null);
    const [progression, setProgression] = useState(0)
    const [videoFile, setVideoFile] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const val = async () => {
        videoFile ? Object.values(videoFile).map(value => {
            console.log(value)
            return value;
        }) : []
    }
    const handleVideoUpload = (event) => {
        const file = event.target.files[0];
        setVideoFile(file);

    }
    const load = async () => {
        const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.4/dist/umd'
        const ffmpeg = ffmpegRef.current;
        // Listen to progress event instead of log.
        ffmpeg.on('progress', ({ progress, time }) => {
            setProgression(Math.round(progress * 100));
        });
        // toBlobURL is used to bypass CORS issue, urls with the same
        // domain can be used directly.
        await ffmpeg.load({
            coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
            wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
        });
        setLoaded(true);
    }

    const transcode = async () => {
        const ffmpeg = ffmpegRef.current;
        await ffmpeg.writeFile('input.${videoFile[type].slice(6,-1)}', await fetchFile(videoFile));
        await ffmpeg.exec(['-i', 'input.${videoFile[type].slice(6,-1)}', 'output.mp3']);
        const data = await ffmpeg.readFile('output.mp3');
        setAudioFile(URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp3' })))
    }
    return (
        <div className="mt-[2%] grid grid-rows-2">
            <div className="flex justify-center items-center">
                <Input type="file" onChange={handleVideoUpload} accept="video/mp4"></Input>
            </div>

            <div className='flex justify-center items-center'>
                {loaded
                    ? (
                        <>
                            <div className="">
                                <div className="mb-[5%] text-center">
                                    <Progress value={progression}></Progress>
                                    <Label className="">{`${progression}%`}</Label>
                                </div>
                                
                                <div className="grid grid-rows-2 gap-4">
                                    <button onClick={transcode} className={`${buttonVariants({ variant: "secondary" })}`}>Transcode webm to mp4</button>
                                    <a href={audioFile} download="Yourvideo.mp3" className={buttonVariants({ variant: "secondary" }) } >Download</a>
                                </div>

                            </div>
                        </>
                    )
                    : (
                        <div className="mt-[2%]">
                            <button onClick={load} className={buttonVariants({ variant: "secondary" })}>Convert</button>


                        </div>
                    )
                }
            </div>

        </div>
    )
}