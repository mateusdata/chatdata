<div className=" border-red-600">
<div className="flex " >
  {arrayTalks?.map((item, index) => (
    <div key={item.id}  className={`border-blue-500 flex w-full border  ${user.nome === item.currentUser? "bg-red-600 justify-start  ": "bg-white justify-end "}`} >
      <div onClick={() => setIstruMensage(!isTrueMensagem)} className="message sent break-words bg-white flex  flex-coll">
        <p onClick={() => alert(`Usuario: ${item.currentUser}\n email: ${item.phoneUser}`)}
         className={`${!(user.nome === item.currentUser) ? user.colorUser : "text-blue-500"}`}
        >
        {!(user.nome === item.currentUser) ? item.currentUser : "Voce"}
        </p>
  
        <p className={`break-words`}>{item.talk}</p>


        <div>
          <CheckIcon className="p-0 m-0 text-2xl" />
          <CheckIcon className="p-0 m-0 text-2xl -ml-2" />
          <span className="hora">{item.time}</span>
          <Popconfirm
            title="Apagar mensagem"
            description="Tem certeza que deseja apagar essa mensagem?"
            onConfirm={() => deleteTalks(item.id)}
            okText="Yes"
            cancelText="No"
          >
            <DeleteIcon
              onClick={() => new Audio(audio3).play()}
              className="text-red-500 h-5"
            />
          </Popconfirm>
        </div>
      </div>
    </div>
  ))}
  {arrayTalks.length === 0 && (
    <div id="whatsapp-message" className="flex gap-1 rounded-md">
      <p className="fa fa-lock"></p>
      Olá {user.nome} Seja bem-vindo ao Chat data, converse com seus amigos nesse chat-group.
    </div>
  )}
</div>
</div>

<form onSubmit={sendMensage}>
<Input
  prefix="Mensagem"
  placeholder={`${false ? emogins.arrayEmogins[changeemogin] : ""} Mensagem...:`}
  onChange={(e) => setMensage(e.target.value)}
  value={mensage}
  className="mb-5"
/>

<button type="submit">
  <SendIcon />
</button>
</form>