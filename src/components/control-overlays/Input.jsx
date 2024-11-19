

export default function Input({  id, label, type = "text", value, onChange, error}) {


    return(
        <>
            <div className="flex flex-col space-y-4">
                <div className="flex flex-row justify-between space-x-4">
                    <label htmlFor={id}>
                        {label}
                    </label>
                    <input value={value} className="rounded border-2 border-violet-100 focus:outline-none focus:border-2 focus:border-violet-700 focus:shadow focus:shadow-violet-500" id={id} type={type} onChange={onChange}/>
                </div>

                {error && <div
                    className="w-full text-center bg-red-400 shadow-md shadow-red-300 rounded-lg leading-loose">{error}</div>}
            </div>
        </>
    )
}